import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

import type { AiPlan } from "@/lib/validators/aiPlan";
import { parseAiPlan } from "@/lib/validators/aiPlan";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

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

    // TODO: replace fakeAiGenerate with real free AI API client call
    const aiRaw = await aiGenerate(user.profile);

    let plan: AiPlan;
    try {
      plan = parseAiPlan(aiRaw);
    } catch (error) {
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 500 }
      );
    }

    const saved = await prisma.workoutPlan.create({
      data: {
        userId: user.id,
        title: plan.title,
        content: plan as any,
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

async function aiGenerate(profile: any) {
  try {
    const prompt = `Create a 4-week workout plan for the ${
      profile.name
    } with the following profile:
    Age: ${profile.age}
    Weight: ${profile.weight} kg
    Height: ${profile.height} cm
    Equipment: ${profile.equipment.join(", ")}
    Time per week: ${profile.timePerWeek} hours
    Goal: ${profile.goal}
    Provide the plan in JSON format with weeks and daily workouts.`;
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              weeks: { type: Type.ARRAY },
              dailyWorkouts: { type: Type.ARRAY },
              week: { type: Type.NUMBER },
              equipment: { type: Type.ARRAY },
              day: { type: Type.STRING },
              exercises: { type: Type.ARRAY },
              name: { type: Type.STRING },
              sets: { type: Type.NUMBER },
              reps: { type: Type.STRING },
              tempo: { type: Type.STRING },
              restSec: { type: Type.NUMBER },
              timePerWeek: { type: Type.NUMBER },
              goal: { type: Type.STRING },
            },
          },
          propertyOrdering: [
            "title",
            "summary",
            "weeks",
            "dailyWorkouts",
            "week",
            "equipment",
            "day",
            "exercises",
            "name",
            "sets",
            "reps",
            "tempo",
            "restSec",
            "timePerWeek",
            "goal",
          ],
        },
      },
    });

    console.log("AI raw response:", res);

    return res.text;
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("AI generation failed");
  }
}
