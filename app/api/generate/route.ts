import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

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

    if (!user?.profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { goal, equipment, timePerWeek } = user.profile;

    //stub response
    const plan = {
      title: `4-Week plan for ${goal}`,
      weeks: Array.from({ length: 4 }).map((_, i) => ({
        week: i + 1,
        workouts: [
          { day: "Day 1", workout: "Chest + Triceps (push)" },
          { day: "Day 2", workout: "Back + Biceps (pull)" },
          {
            day: "Day 3",
            workout: `Cardio + Core, Time available: ${timePerWeek} hrs`,
          },
        ],
      })),
    };

    await prisma.workoutPlan.create({
      data: {
        userId: user.id,
        title: plan.title,
        content: plan,
      },
    });

    return NextResponse.json({ plan }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
