import type { Effect } from "../types/effects";

export const EFFECTS: Effect[] = [
  {
    id: "colorize",
    name: "Colorize",
    description: "Add realistic color to black & white photos",
    icon: "\uD83C\uDFA8",
    apiType: "imagen",
  },
  {
    id: "upscale",
    name: "Upscale & Enhance",
    description: "Increase resolution and sharpen details",
    icon: "\uD83D\uDD0D",
    apiType: "imagen",
  },
  {
    id: "restore",
    name: "Restore / Retouch",
    description: "Remove scratches, damage, and noise",
    icon: "\uD83D\uDD27",
    apiType: "imagen",
  },
  {
    id: "kenburns",
    name: "3D Ken Burns",
    description: "Animated pan & zoom with depth parallax",
    icon: "\uD83C\uDFAC",
    apiType: "veo",
  },
  {
    id: "animate",
    name: "Animate Photo",
    description: "Bring still photos to life with subtle motion",
    icon: "\u2728",
    apiType: "veo",
  },
  {
    id: "cinematic-pan",
    name: "Cinematic Pan",
    description: "Smooth horizontal camera movement",
    icon: "\uD83D\uDCFD\uFE0F",
    apiType: "veo",
  },
  {
    id: "interpolate",
    name: "Frame Interpolation",
    description: "Generate frames between two images (coming soon)",
    icon: "\uD83D\uDD04",
    apiType: "stub",
  },
  {
    id: "bg-replace",
    name: "Background Replace",
    description: "Replace or extend image backgrounds (coming soon)",
    icon: "\uD83C\uDFD4\uFE0F",
    apiType: "stub",
  },
];
