import { prisma } from "@/lib/prisma";
import { ProfileInputSchema } from "@/lib/validators/profile";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import z from "zod";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsedBody = ProfileInputSchema.safeParse(body);

    if (!parsedBody.success) {
      const error = z.treeifyError(parsedBody.error);

      console.error("Profile input validation error:", error);
      return NextResponse.json(
        { error: "Invalid profile input", details: error },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const transformedData = {
      ...parsedBody.data,
      gender: parsedBody.data.gender
        ? (parsedBody.data.gender.toUpperCase() as "MALE" | "FEMALE")
        : undefined,
    };

    await prisma.profile.upsert({
      where: { userId: user.id },
      update: transformedData,
      create: { userId: user.id, ...transformedData },
    });

    console.log("Profile created/updated for user:", user.email);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}
