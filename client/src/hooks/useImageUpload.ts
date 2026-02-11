import { useState, useCallback } from "react";
import { api } from "../services/api";

interface UploadState {
  imageId: string | null;
  imageUrl: string | null;
  filename: string | null;
  isUploading: boolean;
  error: string | null;
}

export function useImageUpload() {
  const [state, setState] = useState<UploadState>({
    imageId: null,
    imageUrl: null,
    filename: null,
    isUploading: false,
    error: null,
  });

  const uploadImage = useCallback(async (file: File) => {
    setState((prev) => ({ ...prev, isUploading: true, error: null }));
    try {
      const result = await api.uploadImage(file);
      setState({
        imageId: result.imageId,
        imageUrl: result.url,
        filename: result.filename,
        isUploading: false,
        error: null,
      });
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: message,
      }));
      throw err;
    }
  }, []);

  const clearImage = useCallback(() => {
    setState({
      imageId: null,
      imageUrl: null,
      filename: null,
      isUploading: false,
      error: null,
    });
  }, []);

  return { ...state, uploadImage, clearImage };
}
