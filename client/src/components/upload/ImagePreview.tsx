import { useCallback } from "react";

interface ImagePreviewProps {
  imageUrl: string;
  filename: string | null;
  resultUrl: string | null;
  resultType: "image" | "video" | null;
  isProcessing: boolean;
  activeEffect: string | null;
  selectedEffectName: string | null;
  elapsedSeconds: number;
  error: string | null;
  onClearImage: () => void;
  onClearResult: () => void;
}

export function ImagePreview({
  imageUrl,
  filename,
  resultUrl,
  resultType,
  isProcessing,
  activeEffect,
  selectedEffectName,
  elapsedSeconds,
  error,
  onClearImage,
  onClearResult,
}: ImagePreviewProps) {
  const handleDownload = useCallback(async () => {
    if (!resultUrl) return;
    try {
      const response = await fetch(resultUrl);
      const blob = await response.blob();
      const ext = resultType === "video" ? "mp4" : "png";
      const downloadName = `restore-result.${ext}`;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(resultUrl, "_blank");
    }
  }, [resultUrl, resultType]);

  return (
    <div className="image-preview">
      <div className="image-preview__header">
        <span className="image-preview__filename">{filename || "Image"}</span>
        {selectedEffectName && (
          <span className="image-preview__effect-tag">{selectedEffectName}</span>
        )}
        <button className="image-preview__clear-btn" onClick={onClearImage}>
          New Image
        </button>
      </div>

      <div className="image-preview__images">
        <div className="image-preview__original">
          <div className="image-preview__label">Original</div>
          <div className="image-preview__img-wrapper">
            <img src={imageUrl} alt="Original" />
            <button
              className="image-preview__trash-btn"
              onClick={onClearImage}
              title="Remove image"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        </div>

        {isProcessing && (
          <div className="image-preview__processing">
            <div className="spinner spinner--large" />
            <p>
              Applying {activeEffect}... ({elapsedSeconds}s)
            </p>
            {activeEffect &&
              ["kenburns", "animate", "cinematic-pan"].includes(
                activeEffect
              ) && (
                <p className="image-preview__hint">
                  Video generation can take 30-120 seconds
                </p>
              )}
          </div>
        )}

        {error && (
          <div className="image-preview__error">
            <p>{error}</p>
            <button onClick={onClearResult}>Dismiss</button>
          </div>
        )}

        {resultUrl && !isProcessing && (
          <div className="image-preview__result">
            <div className="image-preview__label">
              Result
              <button
                onClick={handleDownload}
                className="image-preview__download"
              >
                Download
              </button>
            </div>
            {resultType === "video" ? (
              <video src={resultUrl} controls autoPlay loop />
            ) : (
              <img src={resultUrl} alt="Result" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
