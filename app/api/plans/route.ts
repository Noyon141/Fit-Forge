import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import geminiClient from "@/lib/ai/geminiClient";
import { prisma } from "@/lib/prisma";
import { parseAiPlan } from "@/lib/validators/aiPlan";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.profile)
    return NextResponse.json({ error: "Profile required" }, { status: 400 });

  // Forward the profile to Gemini client
  const aiResult = await geminiClient.generatePlan({
    profile: user.profile,
    requestMeta: {
      userEmail: user.email,
      model: process.env.GEMINI_MODEL,
    },
  });

  // aiResult can be object (AiPlan) or string (raw)
  let planObj: any;
  if (typeof aiResult === "string") {
    // try parse
    try {
      planObj = JSON.parse(aiResult);
    } catch (e) {
      console.error("AI returned non-JSON string:", aiResult);
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      );
    }
  } else {
    planObj = aiResult;
  }

  // Validate strictly with Zod
  try {
    const validPlan = parseAiPlan(planObj);
    // Save in DB (content is JSON -> prisma expects any)
    const saved = await prisma.workoutPlan.create({
      data: {
        userId: user.id,
        title: validPlan.title,
        content: validPlan as any,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // optional
      },
    });

    return NextResponse.json({ planId: saved.id, plan: validPlan });
  } catch (e: any) {
    console.error("Plan validation failed:", e);
    return NextResponse.json(
      {
        error: "AI output did not match required schema",
        details: e?.message || e,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const plans = await prisma.workoutPlan.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ plans }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
