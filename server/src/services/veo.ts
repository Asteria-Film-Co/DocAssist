import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getAI } from "./gemini.js";
import { config } from "../config.js";

const VIDEO_PROMPTS: Record<string, string> = {
  kenburns:
    "Using the provided image as the exact start frame, the camera moves forward, closer and closer to the main subject. The camera ONLY moves FORWARD — getting nearer, approaching, closing in on the subject. Imagine physically walking straight toward the subject: nearby objects grow larger and drift to the edges, distant layers reveal new detail as you get closer. This creates a realistic three-dimensional depth effect. The camera does NOTHING except move forward, closer to the subject. NOT A MONTAGE. NOT A SEQUENCE. NOT MULTIPLE SHOTS. This is ONE SINGLE UNBROKEN CONTINUOUS TAKE with ZERO cuts and ZERO transitions. The camera simply drifts forward, steadily, slowly, getting closer and closer to the subject with cinematic smoothness and realistic 3D parallax depth. No music. No sound effects. Completely silent.",
  animate:
    "Using the provided image as the exact start frame, subtly animate this photograph with gentle, natural movement. Add slight environmental motion like a gentle breeze, flickering light, or ambient atmospheric effects. Keep the animation subtle and realistic. No cuts, all one continuous shot. No music or sound effects. Silent.",
  "cinematic-pan":
    "Using the provided image as the exact start frame, create a slow, smooth lateral camera pan across this photograph. The camera moves strictly sideways, horizontally from left to right, with professional steady movement. No zoom, no push in, no vertical movement — only a horizontal lateral pan. Maintain focus and clarity throughout. No cuts, all one continuous shot. No music or sound effects. Silent.",
};

export async function generateVideo(
  imageId: string,
  effectType: string
): Promise<{ resultUrl: string; resultType: "video" }> {
  const ai = getAI();
  const prompt = VIDEO_PROMPTS[effectType];

  if (!prompt) {
    throw new Error(`Unknown video effect: ${effectType}`);
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

  const ext = path.extname(sourceFile).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };
  const mimeType = mimeTypes[ext] || "image/jpeg";

  // Start video generation
  let operation = await ai.models.generateVideos({
    model: "veo-3.0-generate-001",
    prompt,
    image: {
      imageBytes: base64,
      mimeType,
    },
    config: {
      aspectRatio: "16:9",
      numberOfVideos: 1,
    },
  });

  // Poll until complete
  while (!operation.done) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({
      operation,
    });
  }

  // Get the video result
  const generatedVideos = operation.response?.generatedVideos;
  if (!generatedVideos || generatedVideos.length === 0) {
    throw new Error("Video generation failed - no video returned");
  }

  const video = generatedVideos[0].video;
  if (!video) {
    throw new Error("Video generation failed - empty video response");
  }

  const resultId = uuidv4();
  const resultFilename = `${resultId}.mp4`;
  const resultPath = path.join(uploadsDir, resultFilename);

  // Download the video
  await ai.files.download({ file: video, downloadPath: resultPath });

  return {
    resultUrl: `/uploads/${resultFilename}`,
    resultType: "video",
  };
}
