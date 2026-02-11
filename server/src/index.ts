import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { config } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { errorHandler } from "./middleware/errorHandler.js";
import { initializeAI } from "./services/gemini.js";
import uploadRouter from "./routes/upload.js";
import settingsRouter from "./routes/settings.js";
import chatRouter from "./routes/chat.js";
import effectsRouter from "./routes/effects.js";

const app = express();

// Ensure uploads directory exists
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

// Middleware
app.use(
  cors({
    origin: true, // Allow all origins (for ngrok + dev)
  })
);
app.use(express.json({ limit: "50mb" }));

// Serve uploaded files
app.use("/uploads", express.static(config.uploadDir));

// Routes
app.use("/api/upload", uploadRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/effects", effectsRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Serve built React client (production / ngrok mode)
const clientDistPath = path.join(__dirname, "..", "..", "client", "dist");
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

// Error handler
app.use(errorHandler);

// Initialize AI SDK if key is available
if (config.apiKey) {
  initializeAI();
  console.log("Google AI SDK initialized");
} else {
  console.log("No API key configured. Add one via Settings in the app.");
}

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
