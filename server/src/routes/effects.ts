import { Router } from "express";
import { validateApiKey } from "../middleware/validateApiKey.js";
import { editImage } from "../services/imagen.js";
import { generateVideo } from "../services/veo.js";

const router = Router();

const IMAGE_EFFECTS = ["colorize", "upscale", "restore", "style-transfer"];
const VIDEO_EFFECTS = ["kenburns", "animate", "cinematic-pan"];
const STUB_EFFECTS = ["interpolate", "bg-replace"];

router.post("/:effectType", validateApiKey, async (req, res, next) => {
  try {
    const { effectType } = req.params;
    const { imageId } = req.body;

    if (!imageId) {
      res.status(400).json({ error: "imageId is required" });
      return;
    }

    // Stub effects
    if (STUB_EFFECTS.includes(effectType)) {
      res.status(501).json({
        error: `The "${effectType}" effect is planned for a future version and is not yet available.`,
      });
      return;
    }

    // Image effects (Gemini image editing)
    if (IMAGE_EFFECTS.includes(effectType)) {
      const result = await editImage(imageId, effectType);
      res.json(result);
      return;
    }

    // Video effects (Veo)
    if (VIDEO_EFFECTS.includes(effectType)) {
      const result = await generateVideo(imageId, effectType);
      res.json(result);
      return;
    }

    res.status(400).json({ error: `Unknown effect: ${effectType}` });
  } catch (err) {
    next(err);
  }
});

export default router;
