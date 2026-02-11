import { useState, useCallback } from "react";
import { api } from "../services/api";

interface EffectState {
  isProcessing: boolean;
  activeEffect: string | null;
  resultUrl: string | null;
  resultType: "image" | "video" | null;
  error: string | null;
  elapsedSeconds: number;
}

export function useEffects() {
  const [state, setState] = useState<EffectState>({
    isProcessing: false,
    activeEffect: null,
    resultUrl: null,
    resultType: null,
    error: null,
    elapsedSeconds: 0,
  });

  const applyEffect = useCallback(
    async (effectType: string, imageId: string) => {
      setState({
        isProcessing: true,
        activeEffect: effectType,
        resultUrl: null,
        resultType: null,
        error: null,
        elapsedSeconds: 0,
      });

      // Timer to show elapsed time
      const startTime = Date.now();
      const timer = setInterval(() => {
        setState((prev) => ({
          ...prev,
          elapsedSeconds: Math.floor((Date.now() - startTime) / 1000),
        }));
      }, 1000);

      try {
        const result = await api.applyEffect(effectType, imageId);
        clearInterval(timer);
        setState({
          isProcessing: false,
          activeEffect: null,
          resultUrl: result.resultUrl,
          resultType: result.resultType as "image" | "video",
          error: null,
          elapsedSeconds: Math.floor((Date.now() - startTime) / 1000),
        });
        return result;
      } catch (err) {
        clearInterval(timer);
        const message =
          err instanceof Error ? err.message : "Effect processing failed";
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          activeEffect: null,
          error: message,
        }));
        throw err;
      }
    },
    []
  );

  const clearResult = useCallback(() => {
    setState({
      isProcessing: false,
      activeEffect: null,
      resultUrl: null,
      resultType: null,
      error: null,
      elapsedSeconds: 0,
    });
  }, []);

  return { ...state, applyEffect, clearResult };
}
