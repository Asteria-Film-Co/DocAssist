import { useState, useCallback } from "react";
import { api } from "../../services/api";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasApiKey: boolean;
  onApiKeySaved: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  hasApiKey,
  onApiKeySaved,
}: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = useCallback(async () => {
    if (!apiKey.trim()) return;

    setIsSaving(true);
    setMessage(null);
    try {
      await api.saveApiKey(apiKey.trim());
      setMessage("API key saved successfully!");
      setApiKey("");
      onApiKeySaved();
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Failed to save API key"
      );
    } finally {
      setIsSaving(false);
    }
  }, [apiKey, onApiKeySaved]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Settings</h2>
          <button className="modal__close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal__body">
          <div className="modal__field">
            <label className="modal__label">Google API Key</label>
            <p className="modal__help">
              Get your key from{" "}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google AI Studio
              </a>
            </p>
            <div className="modal__status">
              Status:{" "}
              {hasApiKey ? (
                <span className="modal__status--ok">Configured</span>
              ) : (
                <span className="modal__status--missing">Not set</span>
              )}
            </div>
            <input
              type="password"
              className="modal__input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={
                hasApiKey ? "Enter new key to replace" : "Paste your API key"
              }
            />
          </div>
          {message && <p className="modal__message">{message}</p>}
        </div>
        <div className="modal__footer">
          <button className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn--primary"
            onClick={handleSave}
            disabled={!apiKey.trim() || isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
