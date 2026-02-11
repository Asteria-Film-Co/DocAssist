import { GoogleGenAI } from "@google/genai";
import { config } from "../config.js";
import { ChatMessage } from "../types/index.js";

let ai: GoogleGenAI | null = null;

export function initializeAI() {
  if (config.apiKey) {
    ai = new GoogleGenAI({ apiKey: config.apiKey });
  }
}

export function getAI(): GoogleGenAI {
  if (!ai) {
    initializeAI();
  }
  if (!ai) {
    throw new Error("Google AI SDK not initialized. Please set your API key.");
  }
  return ai;
}

const SYSTEM_PROMPT = `You are a research assistant for documentary filmmakers — think of yourself as a librarian, history professor, and archival research expert rolled into one. You help with:
- Historical research, fact-checking, and primary source identification
- Finding context and background for historical events, people, and places
- Identifying and suggesting archival sources, libraries, collections, and reference materials
- Storytelling, narrative structure, and documentary filmmaking advice
- Technical filmmaking questions

IMPORTANT RULES:
- You have access to the user's uploaded photograph. However, do NOT describe or analyze the image unless the user explicitly asks you about it. Never volunteer observations about the image unprompted.
- Do NOT suggest or recommend using photo effects, enhancements, filters, or any of this application's tools. You are a research expert only. If the user asks about the tools, you may answer, but never proactively suggest them.
- Stay in your role as a knowledgeable researcher and historian. Be thorough but concise.
- When discussing historical topics, note when facts are uncertain or debated. Always cite time periods and locations when relevant.`;

export async function sendChat(
  messages: ChatMessage[],
  imageId?: string
): Promise<string> {
  const client = getAI();

  // If there's an uploaded image, load it so Gemini can see it
  let imageData: { mimeType: string; data: string } | null = null;
  if (imageId) {
    const fs = await import("fs");
    const path = await import("path");
    const { config: appConfig } = await import("../config.js");
    const files = fs.default.readdirSync(appConfig.uploadDir);
    const sourceFile = files.find((f: string) => f.startsWith(imageId));
    if (sourceFile) {
      const sourcePath = path.default.join(appConfig.uploadDir, sourceFile);
      const buffer = fs.default.readFileSync(sourcePath);
      const ext = path.default.extname(sourceFile).toLowerCase();
      const mimeTypes: Record<string, string> = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
      };
      imageData = {
        mimeType: mimeTypes[ext] || "image/jpeg",
        data: buffer.toString("base64"),
      };
    }
  }

  // Find the index of the first user message to attach the image to
  const firstUserIdx = imageData
    ? messages.findIndex((m) => m.role === "user")
    : -1;

  const contents = messages.map((m, i) => {
    const parts: Array<
      { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [{ text: m.content }];

    // Attach the image to the first user message so Gemini can see it
    if (imageData && i === firstUserIdx) {
      parts.push({ inlineData: imageData });
    }

    return {
      role: m.role === "user" ? ("user" as const) : ("model" as const),
      parts,
    };
  });

  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });

  return response.text || "I'm sorry, I couldn't generate a response.";
}
