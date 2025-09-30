import geminiClient from "@/lib/ai/geminiClient";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Profile } from "@/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user?.profile) {
      return NextResponse.json({ error: "Profile required" }, { status: 404 });
    }

    //CALL GEMINI AI

    const plan = await geminiClient.generatePlan(user.profile as Profile);

    // plan is already validated by geminiClient (or fallback)

    const saved = await prisma.workoutPlan.create({
      data: {
        userId: user.id,
        title: plan.title,
        content: plan as object,
      },
    });

    return NextResponse.json({ planId: saved.id, plan }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
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
      include: { workoutPlans: true, profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!user?.profile) {
      return NextResponse.json({ error: "Profile required" }, { status: 404 });
    }

    const plans = user.workoutPlans.map((plan) => ({
      id: plan.id,
      title: plan.title,
      content: plan.content,
      createdAt: plan.createdAt,
    }));

    return NextResponse.json({ plans }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
