const API_BASE = import.meta.env.VITE_API_URL || "";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  return data as T;
}

export const api = {
  async checkSettings(): Promise<{ hasApiKey: boolean }> {
    const res = await fetch(`${API_BASE}/api/settings`);
    return handleResponse(res);
  },

  async saveApiKey(apiKey: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    return handleResponse(res);
  },

  async uploadImage(
    file: File
  ): Promise<{ imageId: string; url: string; filename: string }> {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(res);
  },

  async sendChat(
    messages: Array<{ role: string; content: string }>,
    imageId?: string | null
  ): Promise<{ response: string }> {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, imageId: imageId || undefined }),
    });
    return handleResponse(res);
  },

  async applyEffect(
    effectType: string,
    imageId: string
  ): Promise<{ resultUrl: string; resultType: string }> {
    const res = await fetch(`${API_BASE}/api/effects/${effectType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageId }),
    });
    return handleResponse(res);
  },
};
