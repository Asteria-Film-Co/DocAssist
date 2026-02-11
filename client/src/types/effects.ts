export interface Effect {
  id: string;
  name: string;
  description: string;
  icon: string;
  apiType: "imagen" | "veo" | "stub";
}
