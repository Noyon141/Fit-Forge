import { AiPlan, parseAiPlan } from "@/lib/validators/aiPlan";
import { Profile } from "@/types";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

const KEY = process.env.GEMINI_API_KEY!;

if (!KEY) {
  console.warn("GEMINI_API_KEY is missing from environment variables");
}

// **CHANGE**: Initialize the Generative AI client
const genAI = new GoogleGenerativeAI(KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
function createCacheKey(profile: Profile): any {
  const sortedProfile = Object.keys(profile)
    .sort()
    .reduce((obj: Record<string, any>, key) => {
      obj[key] = profile[key as keyof Profile];
      return obj;
    }, {} as Record<string, any>);

  const profileString = JSON.stringify(sortedProfile);
  return createHash("sha256").update(profileString).digest("hex");
}

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.0,
  },
  // Note: Adjust safety settings if you encounter blocks. Be cautious.
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
});

async function callGemini(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;

    const jsonText = response.text();

    if (!jsonText) {
      throw new Error("Received an empty response from Gemini API.");
    }

    return jsonText;
  } catch (error) {
    console.error("Error calling Gemini API via SDK:", error);
    // Re-throw the error to be handled by the main generatePlan function
    throw error;
  }
}

function buildPrompt(profile: Profile): string {
  // This function is excellent, no changes needed.
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

Do NOT include any extra text, markdown formatting like \`\`\`json, or explanations. Return only the raw JSON object.`;
}

export default {
  // Your robust generatePlan logic remains largely the same, which is great!
  async generatePlan(profile: Profile): Promise<AiPlan> {
    const cacheKey = createCacheKey(profile);

    // **4. Check the Redis cache for an existing plan**
    try {
      const cachedPlan = await redis.get<AiPlan>(cacheKey);
      if (cachedPlan) {
        console.log(
          `CACHE HIT: Found plan for key: ${cacheKey.substring(0, 10)}...`
        );
        return cachedPlan;
      }
    } catch (error) {
      console.error("Redis GET failed:", error);
      // If Redis fails, we can proceed to generate a new plan instead of crashing
    }

    console.log(
      `CACHE MISS: Generating new plan for key: ${cacheKey.substring(0, 10)}...`
    );
    const prompt = buildPrompt(profile);
    let jsonString: string;

    try {
      jsonString = await callGemini(prompt);
    } catch (err) {
      console.error("Gemini initial call failed:", err);
      return fallbackPlan(profile);
    }

    try {
      const parsedJson = JSON.parse(jsonString);
      const validPlan = parseAiPlan(parsedJson);

      // **5. Store the new plan in Redis with an expiration time**
      try {
        await redis.set(cacheKey, JSON.stringify(validPlan), {
          ex: 86400, // Expire after 24 hours (86400 seconds)
        });
      } catch (error) {
        console.error("Redis SET failed:", error);
        // If caching fails, we still return the plan to the user
      }

      return validPlan;
    } catch (e) {
      console.warn("Initial parsing failed. Attempting to repair.", e);

      try {
        const repairPrompt = `The previous response was not valid JSON. Here is the raw response:\n${jsonString}\nPlease RETURN ONLY valid JSON that matches the REQUIRED SCHEMA from the earlier instruction. Do not add any text, markdown, or explanations.`;
        const repairedJsonString = await callGemini(repairPrompt);
        const parsedJson = JSON.parse(repairedJsonString);
        return parseAiPlan(parsedJson);
      } catch (e2) {
        console.error("Gemini repair and validation failed:", e2);
        return fallbackPlan(profile);
      }
    }
  },
};

// Your fallbackPlan function is great, no changes needed.
function fallbackPlan(profile: any): AiPlan {
  return {
    title: "Fallback 4-week plan",
    summary: "A basic plan to get you started.",
    weeklyStructure: {
      /* ... structure ... */
    },
    nutrition: { calories: null, protein_g: null },
    progressMetrics: ["completion_percent"],
    coachNotes:
      "This is a fallback plan. For a personalized experience, please try again later.",
  };
}
