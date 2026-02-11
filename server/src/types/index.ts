export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface EffectResult {
  resultUrl: string;
  resultType: "image" | "video";
}

export interface UploadResult {
  imageId: string;
  url: string;
  filename: string;
}
