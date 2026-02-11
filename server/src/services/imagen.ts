import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getAI } from "./gemini.js";
import { config } from "../config.js";

const EFFECT_PROMPTS: Record<string, string> = {
  colorize:
    "Colorize this black and white photograph with realistic, historically accurate colors. Preserve all original details, textures, and composition. Make the colors natural and period-appropriate.",
  upscale:
    "Enhance and upscale this image to 4K resolution (3840x2160). Maximize clarity, sharpness, and fine detail recovery. Reconstruct textures and edges with precision while faithfully preserving the original content, composition, and character of the photograph. The output image must be high-resolution and suitable for large-format display.",
  restore:
    "Restore this photograph: carefully remove scratches, tears, stains, and damage. Reduce noise and grain while preserving the original content, details, and character of the image.",
  "style-transfer":
    "Apply a painterly cinematic style to this photograph while maintaining the subject, composition, and recognizability of the original image.",
};

export async function editImage(
  imageId: string,
  effectType: string
): Promise<{ resultUrl: string; resultType: "image" }> {
  const ai = getAI();
  const prompt = EFFECT_PROMPTS[effectType];

  if (!prompt) {
    throw new Error(`Unknown image effect: ${effectType}`);
  }

  // Find the source image
  const uploadsDir = config.uploadDir;
  const files = fs.readdirSync(uploadsDir);
  const sourceFile = files.find((f) => f.startsWith(imageId));

  if (!sourceFile) {
    throw new Error(`Image not found: ${imageId}`);
  }

  const sourcePath = path.join(uploadsDir, sourceFile);
  const imageBuffer = fs.readFileSync(sourcePath);
  const base64 = imageBuffer.toString("base64");

  // Determine MIME type from extension
  const ext = path.extname(sourceFile).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };
  const mimeType = mimeTypes[ext] || "image/jpeg";

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64 } },
        ],
      },
    ],
    config: {
      responseModalities: ["IMAGE", "TEXT"],
    },
  });

  // Extract generated image from response
  const candidate = response.candidates?.[0];
  if (!candidate?.content?.parts) {
    throw new Error("No response from image editing model");
  }

  for (const part of candidate.content.parts) {
    if (part.inlineData) {
      const resultId = uuidv4();
      const resultExt =
        part.inlineData.mimeType === "image/png" ? ".png" : ".jpg";
      const resultFilename = `${resultId}${resultExt}`;
      const resultPath = path.join(uploadsDir, resultFilename);

      fs.writeFileSync(
        resultPath,
        Buffer.from(part.inlineData.data!, "base64")
      );

      return {
        resultUrl: `/uploads/${resultFilename}`,
        resultType: "image",
      };
    }
  }

  throw new Error(
    "The model did not return an edited image. Try again or try a different effect."
  );
}
