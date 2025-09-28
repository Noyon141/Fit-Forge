// lib/ai/geminiClient.ts
import { AiPlan } from "@/lib/validators/aiPlan";
import axios from "axios";

/**
 * Generic Gemini wrapper.
 * - Sends a carefully-crafted prompt instructing the model to return ONLY JSON
 *   matching the AiPlanSchema structure.
 *
 * NOTE: Adjust request payload shape to match the exact Gemini endpoint format you use.
 * (Google's docs show a structured-output approach; this wrapper sends `input` with `prompt`.)
 */

const GEMINI_URL = process.env.GEMINI_API_URL!;
const GEMINI_KEY = process.env.GEMINI_API_KEY!;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

if (!GEMINI_URL || !GEMINI_KEY) {
  console.warn(
    "GEMINI_API_URL or GEMINI_API_KEY not set — ai client will fail until set."
  );
}

type GeminiRawResponse = {
  // keep generic so we can handle various shapes — we'll parse raw text
  data: {
    // typical shape: { output: "...." } or similar — adapt if needed
    [k: string]: any;
  };
};

export default {
  /**
   * generatePlan: sends user's profile + constraints and requests strict JSON plan.
   * Returns the parsed AiPlan-compatible JS object (not string).
   */
  async generatePlan(profile: Record<string, any>): Promise<AiPlan | string> {
    // Build the structured JSON instruction — concise but strict
    const prompt = buildPlanPrompt(profile);

    // Example request body — adjust if your Gemini endpoint expects different fields.
    const body = {
      // If required, include model field
      model: MODEL,
      input: prompt,
      // add any other fields required by the endpoint (temperature, response_spec, etc.)
      // E.g., for a structured-output endpoint, you might pass a "response_spec" object instead.
    };

    try {
      const res = (await axios.post(GEMINI_URL, body, {
        headers: {
          Authorization: `Bearer ${GEMINI_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60_000,
      })) as GeminiRawResponse;

      // Attempt to locate model text output:
      const rawText = extractTextFromResponse(res.data);

      // We expect rawText to be JSON string. Try parse. If it's already an object, return it.
      try {
        const parsed =
          typeof rawText === "string" ? JSON.parse(rawText) : rawText;
        return parsed as AiPlan;
      } catch (err) {
        // If parsing fails, return rawText so caller can attempt repair, logging, or manual fallback.
        console.error("Failed to JSON.parse AI output:", err);
        return rawText as string;
      }
    } catch (err) {
      console.error("Gemini request failed:", err);
      throw err;
    }
  },
};

/** Build the prompt that enforces JSON-only structured output */
function buildPlanPrompt(profile: Record<string, any>) {
  // Keep prompt explicit and short — we already enforce schema with Zod server-side.
  return `
You are a professional certified fitness coach. Produce a detailed 4-week workout plan for the following user profile (JSON input):
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
      },
      ...
    },
   "week2": {...},
   "week3": {...},
   "week4": {...}
  },
  "nutrition": { "calories": number|null, "protein_g": number|null, "notes":"string|null" },
  "progressMetrics": ["string"],
  "coachNotes": "string|null"
}

Make all values concrete and actionable. Use simple exercise names and include progression cues. Output must be parsable JSON. No extra text.
`;
}

/** Attempt to extract text from typical Gemini response shapes. Adjust if needed. */
function extractTextFromResponse(data: any): string | object {
  // Common patterns:
  if (!data) return "";

  // If the response already contains "output" or "content"
  if (typeof data.output === "string") return data.output;
  if (typeof data.text === "string") return data.text;
  if (data.outputs && Array.isArray(data.outputs) && data.outputs[0]?.content) {
    const first = data.outputs[0];
    // might have structured content
    if (typeof first.content === "string") return first.content;
    if (first.content?.[0]?.text) return first.content[0].text;
  }

  // fallback: return serialized object (caller will attempt parse)
  return JSON.stringify(data);
}
