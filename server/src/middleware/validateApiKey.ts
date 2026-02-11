import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export function validateApiKey(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (!config.apiKey) {
    res.status(401).json({
      error: "Google API key not configured. Please add it in Settings.",
    });
    return;
  }
  next();
}
