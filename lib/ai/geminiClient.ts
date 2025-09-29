import { AiPlan, parseAiPlan } from "@/lib/validators/aiPlan";
import { Profile } from "@/types";
import axios from "axios";

const BASE_URL = process.env.GEMINI_API_URL!;
const KEY = process.env.GEMINI_API_KEY!;

if (!BASE_URL || !KEY) {
  console.warn("GEMINI_API_URL or GEMINI_API_KEY missing");
}

function makeUrl() {
  return `${BASE_URL}?key=${KEY}`;
}

function extractText(data: any): string {
  // common shapes: data.candidates[0].content, data.output, data.text, data.outputs[0].content
  if (!data) return "";
  if (typeof data === "string") return data;
  if (data.output) return data.output;
  if (data.text) return data.text;
  if (data.candidates && data.candidates[0]?.content)
    return JSON.stringify(data.candidates[0].content);
  if (data.outputs && data.outputs[0]?.content) {
    const c = data.outputs[0].content;
    if (typeof c === "string") return c;
    if (Array.isArray(c) && c[0]?.text) return c[0].text;
    return JSON.stringify(c);
  }
  return JSON.stringify(data);
}

async function callGemini(prompt: string): Promise<Profile> {
  const url = makeUrl();
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generation_config: {
      response_mime_type: "application/json",
      // you can add temperature, max_output_tokens here
      temperature: 0.0,
      max_output_tokens: 1400,
    },
  };

  const res = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 60_000,
  });
  return res.data;
}

function buildPrompt(profile: Profile) {
  return `You are a professional certified fitness coach. Produce a detailed 4-week workout plan for the user profile (JSON ONLY). The user profile:
${JSON.stringify(profile)}

Output MUST be valid JSON matching this schema:
{
 "title":"string",
 "summary":"string",
 "weeklyStructure": {
   "week1": { "day1": { "name":"string", "warmup":["string"], "exercises":[{ "id":"string","name":"string","sets":number,"reps":"string","tempo":"string|null","restSec":number|null,"progression":"string|null","notes":"string|null" }], "cooldown":["string"] } },
   "week2": {...}, "week3": {...}, "week4": {...}
 },
 "nutrition": { "calories":number|null, "protein_g":number|null },
 "progressMetrics": ["string"],
 "coachNotes":"string|null"
}

Do NOT include any extra text. Return JSON only.`;
}

export default {
  async generatePlan(profile: Profile): Promise<AiPlan> {
    // 1) initial call
    const prompt = buildPrompt(profile);
    let raw: any;
    try {
      const data = await callGemini(prompt);
      raw = extractText(data);
    } catch (err) {
      console.error("Gemini initial call failed:", err);
      throw new Error("AI generation failed");
    }

    // 2) try parse
    let parsed: any = null;
    try {
      parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (e) {
      // attempt repair: call Gemini asking to fix its previous output (one retry)
      try {
        const repairPrompt = `The previous response was not valid JSON. Here is the raw response:\n${raw}\nPlease RETURN ONLY valid JSON that matches the REQUIRED SCHEMA from the earlier instruction. Do not add text.`;
        const repairData = await callGemini(repairPrompt);
        const repairRaw = extractText(repairData);
        parsed =
          typeof repairRaw === "string" ? JSON.parse(repairRaw) : repairRaw;
      } catch (e2) {
        console.error("Gemini repair failed:", e2);
        // fallback to deterministic template
        const fallback = fallbackPlan(profile);
        return fallback;
      }
    }

    // 3) validate strictly with zod
    try {
      const valid = parseAiPlan(parsed);
      return valid;
    } catch (e) {
      console.error("Validation failed:", e);
      // fallback to deterministic template
      return fallbackPlan(profile);
    }
  },
};

function fallbackPlan(profile: any) {
  // deterministic limited plan to avoid shipping garbage — simple but valid shape
  const weeks: any = {};
  for (let w = 1; w <= 4; w++) {
    const wkKey = `week${w}`;
    weeks[wkKey] = {
      day1: {
        name: "Full Body A",
        warmup: ["5 min cardio", "dynamic stretch"],
        exercises: [
          {
            id: "e1",
            name: "Squat (bodyweight)",
            sets: 3,
            reps: "10-12",
            tempo: null,
            restSec: 60,
            progression: "add reps",
            notes: null,
          },
          {
            id: "e2",
            name: "Push-up",
            sets: 3,
            reps: "8-12",
            tempo: null,
            restSec: 60,
            progression: "progress to incline/weighted",
            notes: null,
          },
        ],
        cooldown: ["stretch 3 min"],
      },
      day2: {
        name: "Rest / Mobility",
        exercises: [],
        warmup: [],
        cooldown: [],
      },
      day3: {
        name: "Full Body B",
        warmup: ["5 min cardio"],
        exercises: [
          { id: "e3", name: "Bent-over row (dumbbell)", sets: 3, reps: "8-12" },
        ],
        cooldown: [],
      },
    };
  }

  const plan = {
    title: "Fallback 4-week plan",
    summary: "Deterministic fallback plan. Replace with AI when available.",
    weeklyStructure: weeks,
    nutrition: { calories: null, protein_g: null },
    progressMetrics: ["completion_percent"],
    coachNotes:
      "Fallback plan — consider upgrading to pro for tailored programs.",
  };
  return plan;
}
