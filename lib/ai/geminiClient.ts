// lib/ai/geminiClient.ts
import { AiPlan } from "@/lib/validators/aiPlan";
import axios from "axios";

const GEMINI_KEY = process.env.GEMINI_API_KEY!;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;

if (!GEMINI_URL || !GEMINI_KEY) {
  console.warn("GEMINI_API_KEY not set — ai client will fail until set.");
}

type GeminiRawResponse = {
  data: {
    [k: string]: any;
  };
};

export default {
  async generatePlan({
    profile,
    requestMeta,
  }: {
    profile: Record<string, any>;
    requestMeta?: Record<string, any>;
  }): Promise<AiPlan | string> {
    const prompt = buildPlanPrompt(profile);

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    try {
      const res = (await axios.post(GEMINI_URL, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })) as GeminiRawResponse;

      const rawText = extractTextFromResponse(res.data);

      try {
        const parsed =
          typeof rawText === "string" ? JSON.parse(rawText) : rawText;
        return parsed as AiPlan;
      } catch (err) {
        console.error("Failed to JSON.parse AI output:", err);
        return rawText as string;
      }
    } catch (err: any) {
      console.error("Gemini request failed:", err);
      console.error("Response data:", err.response?.data);
      console.error("Status:", err.response?.status);
      throw err;
    }
  },
};

function buildPlanPrompt(profile: Record<string, any>) {
  return `You are a professional certified fitness coach. Produce a detailed 4-week workout plan for the following user profile:
${JSON.stringify(profile)}

Return ONLY valid JSON matching this schema:
{
  "title": "string",
  "summary": "string", 
  "weeklyStructure": {
    "week1": {
      "day1": {
         "name": "string",
         "warmup": ["string"],
         "exercises": [
            { "id":"string", "name":"string", "sets":number, "reps":"string", "tempo":"string|null", "restSec":number|null, "progression":"string|null", "notes":"string|null" }
         ],
         "cooldown": ["string"]
      }
    }
  },
  "nutrition": { "calories": number|null, "protein_g": number|null, "notes":"string|null" },
  "progressMetrics": ["string"],
  "coachNotes": "string|null"
}

Output must be parsable JSON. No extra text.`;
}

function extractTextFromResponse(data: any): string | object {
  if (!data) return "";

  if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }

  if (typeof data.output === "string") return data.output;
  if (typeof data.text === "string") return data.text;

  return JSON.stringify(data);
}
