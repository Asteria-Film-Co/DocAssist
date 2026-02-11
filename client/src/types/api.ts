export interface UploadResponse {
  imageId: string;
  url: string;
  filename: string;
}

export interface EffectResponse {
  resultUrl: string;
  resultType: "image" | "video";
}

export interface ChatResponse {
  response: string;
}

export interface SettingsResponse {
  hasApiKey: boolean;
}

export interface ErrorResponse {
  error: string;
}
