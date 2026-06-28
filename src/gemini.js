import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function analyzeVideo(data) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are ViralAI, an elite YouTube strategist, SEO expert, thumbnail expert, and retention specialist.

Analyze this YouTube video idea using current YouTube best practices.

TITLE:
${data.title}

HOOK:
${data.hook}

THUMBNAIL:
${data.thumbnail}

Instructions:

- Score every category from 0-100.
- Be brutally honest.
- Explain weaknesses.
- Suggest improvements.
- Optimize for YouTube SEO.
- Think like a creator with over 10 million subscribers.
- Return ONLY valid JSON.
- Do NOT use markdown.
Do NOT wrap the JSON in code fences.
Do NOT use asterisks.
Return plain text only.

Return:

- Exactly 3 strengths.
- Exactly 3 problems.
- Exactly 5 improved titles.
- Exactly 5 improved hooks.
- Exactly 20 YouTube tags.
- A complete SEO description.
- A detailed AI image prompt for the thumbnail.
- A compelling first 15-second script.
- A strong call to action.
- Viral probability must be one of:
  Low
  Medium
  High
  Very High

Return exactly this JSON structure:

{
  "viralScore": 0,
  "ctrScore": 0,
  "retentionScore": 0,
  "competitionScore": 0,
  "trendScore": 0,
  "strengths": [],
  "problems": [],
  "improvedTitles": [],
  "improvedHooks": [],
  "seoDescription": "",
  "youtubeTags": [],
  "thumbnailRecommendation": "",
  "thumbnailPrompt": "",
  "first15SecondsScript": "",
  "callToAction": "",
  "viralProbability": ""
}
  `;

const result = await model.generateContent(prompt);

const text = result.response.text();

const clean = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const jsonStart = clean.indexOf("{");
const jsonEnd = clean.lastIndexOf("}");

if (jsonStart === -1 || jsonEnd === -1) {
  throw new Error("No JSON object found in Gemini response.");
}

const json = clean.substring(jsonStart, jsonEnd + 1);

try {
  return JSON.parse(json);
} catch (err) {
  console.error("Invalid JSON returned by Gemini:");
  console.error(clean);
  console.error(err);

  throw new Error(`Gemini returned invalid JSON: ${err.message}`);
}
}