import { Router } from "express";
import { sendChat } from "../services/gemini.js";
import { validateApiKey } from "../middleware/validateApiKey.js";
import { ChatMessage } from "../types/index.js";

const router = Router();

router.post("/", validateApiKey, async (req, res, next) => {
  try {
    const { messages, imageId } = req.body as {
      messages: ChatMessage[];
      imageId?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Messages array is required" });
      return;
    }

    const response = await sendChat(messages, imageId);
    res.json({ response });
  } catch (err) {
    next(err);
  }
});

export default router;
