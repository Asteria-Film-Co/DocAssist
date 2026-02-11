import { useCallback, useRef, type DragEvent, type ChangeEvent } from "react";

interface ImageUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export function ImageUpload({ onUpload, isUploading }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  return (
    <div
      className="image-upload"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/tiff"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {isUploading ? (
        <div className="image-upload__loading">
          <div className="spinner" />
          <p>Uploading...</p>
        </div>
      ) : (
        <div className="image-upload__prompt">
          <div className="image-upload__icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="image-upload__text">
            Drop an image here or click to browse
          </p>
          <p className="image-upload__subtext">
            JPEG, PNG, WebP, or TIFF up to 50MB
          </p>
        </div>
      )}
    </div>
  );
}
