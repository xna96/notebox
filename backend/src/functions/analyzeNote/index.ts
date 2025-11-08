import { app, HttpRequest, HttpResponseInit } from "@azure/functions";

const MODEL_URL = "https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base";
const HUGGINGFACE_API = process.env.HUGGINGFACE_API_KEY;

export async function analyzeNote(req: HttpRequest): Promise<HttpResponseInit> {

 
  try {
    const body = (req as any).req?.body as { message?: string };
    const message = body?.message;
    

    console.log("Analyzing message:", message);
    console.log("Using key?", !!HUGGINGFACE_API);

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(HUGGINGFACE_API ? { Authorization: `Bearer ${HUGGINGFACE_API}` } : {}),
      },
      body: JSON.stringify({ inputs: message }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("Hugging Face error:", text);
      return { status: response.status, jsonBody: { error: text } };
    }

    const data = await response.json();
    console.log("Response data:", JSON.stringify(data));

    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      return { status: 500, jsonBody: { error: "Invalid response from Hugging Face" } };
    }

    interface EmotionScore {
      label: string;
      score: number;
    }

    const emotion: string =
      (data[0] as EmotionScore[])
        ?.sort((a: EmotionScore, b: EmotionScore) => b.score - a.score)[0]?.label || "neutral";

    const emotionMap: Record<string, { color: string}> = {
      joy: { color: "#ffd93dff"},
      sadness: { color: "#5220e8ff"},
      anger: { color: "#6f2e17ff"},
      fear: { color: "#8711e8ff"},
      love: { color: "#6BCB77"},
      surprise: { color: "#FFB6C1" },
      neutral: { color: "#B0BEC5" },
    };

    const { color } = emotionMap[emotion] || emotionMap.neutral;

    return {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emotion, color }),
    };
  } catch (err) { return { status: 500, jsonBody: { error: "Failed to analyze note" } }; } }


