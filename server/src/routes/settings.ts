import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "../config.js";
import { initializeAI } from "../services/gemini.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get("/", (_req, res) => {
  res.json({ hasApiKey: !!config.apiKey });
});

router.post("/", (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey || typeof apiKey !== "string") {
    res.status(400).json({ error: "API key is required" });
    return;
  }

  // Try to update the .env file (may fail on hosted platforms like Railway — that's OK)
  try {
    const envPath = path.join(__dirname, "..", "..", ".env");
    fs.writeFileSync(envPath, `GOOGLE_API_KEY=${apiKey}\n`);
  } catch {
    // On Railway/hosted platforms, env vars are set via dashboard instead
    console.log("Could not write .env file (expected on hosted platforms)");
  }

  // Update runtime config
  config.apiKey = apiKey;
  process.env.GOOGLE_API_KEY = apiKey;

  // Re-initialize the AI SDK
  initializeAI();

  res.json({ success: true });
});

export default router;
