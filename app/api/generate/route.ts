import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { goal, equipment, time } = body;

    //stub response
    const plan = {
      title: `4-Week plan for ${goal}`,
      weeks: Array.from({ length: 4 }).map((_, i) => ({
        week: i + 1,
        workouts: [
          { day: "Day 1", workout: "Chest + Triceps (push)" },
          { day: "Day 2", workout: "Back + Biceps (pull)" },
        ],
      })),
    };

    return NextResponse.json({ plan }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
