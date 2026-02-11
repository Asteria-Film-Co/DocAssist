import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, "..", ".env") });

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  apiKey: process.env.GOOGLE_API_KEY || "",
  uploadDir: path.join(__dirname, "..", "uploads"),
};
