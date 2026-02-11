import { useState, useEffect, useCallback } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import { Sidebar } from "./components/layout/Sidebar";
import { CenterPanel } from "./components/layout/CenterPanel";
import { ChatPanel } from "./components/layout/ChatPanel";
import { EffectsList } from "./components/effects/EffectsList";
import { ImageUpload } from "./components/upload/ImageUpload";
import { ImagePreview } from "./components/upload/ImagePreview";
import { ChatWindow } from "./components/chat/ChatWindow";
import { SettingsModal } from "./components/settings/SettingsModal";
import { useImageUpload } from "./hooks/useImageUpload";
import { useEffects } from "./hooks/useEffects";
import { useChat } from "./hooks/useChat";
import { EFFECTS } from "./constants/effects";
import { api } from "./services/api";
import "./App.css";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);

  const {
    imageId,
    imageUrl,
    filename,
    isUploading,
    error: uploadError,
    uploadImage,
    clearImage,
  } = useImageUpload();

  const {
    isProcessing,
    activeEffect,
    resultUrl,
    resultType,
    error: effectError,
    elapsedSeconds,
    applyEffect,
    clearResult,
  } = useEffects();

  const {
    messages,
    isLoading: chatLoading,
    error: chatError,
    sendMessage,
  } = useChat();

  useEffect(() => {
    api
      .checkSettings()
      .then((res) => setHasApiKey(res.hasApiKey))
      .catch(() => {});
  }, []);

  const handleEffectClick = useCallback(
    (effectId: string) => {
      if (imageId) {
        setSelectedEffect(effectId);
        applyEffect(effectId, imageId);
      }
    },
    [imageId, applyEffect]
  );

  const handleClearImage = useCallback(() => {
    clearImage();
    clearResult();
    setSelectedEffect(null);
  }, [clearImage, clearResult]);

  const handleSendMessage = useCallback(
    (content: string) => {
      sendMessage(content, imageId);
    },
    [sendMessage, imageId]
  );

  const handleApiKeySaved = useCallback(() => {
    setHasApiKey(true);
  }, []);

  // Look up the display name for the selected effect
  const selectedEffectName = selectedEffect
    ? EFFECTS.find((e) => e.id === selectedEffect)?.name ?? null
    : null;

  return (
    <>
      <AppLayout
        sidebar={
          <Sidebar onSettingsClick={() => setSettingsOpen(true)}>
            <EffectsList
              hasImage={!!imageId}
              isProcessing={isProcessing}
              activeEffect={activeEffect}
              selectedEffect={selectedEffect}
              onEffectClick={handleEffectClick}
            />
          </Sidebar>
        }
        center={
          <CenterPanel>
            {!imageUrl ? (
              <ImageUpload onUpload={uploadImage} isUploading={isUploading} />
            ) : (
              <ImagePreview
                imageUrl={imageUrl}
                filename={filename}
                resultUrl={resultUrl}
                resultType={resultType}
                isProcessing={isProcessing}
                activeEffect={activeEffect}
                selectedEffectName={selectedEffectName}
                elapsedSeconds={elapsedSeconds}
                error={effectError || uploadError}
                onClearImage={handleClearImage}
                onClearResult={clearResult}
              />
            )}
            {!hasApiKey && (
              <div className="api-key-banner">
                No API key configured.{" "}
                <button onClick={() => setSettingsOpen(true)}>
                  Add your Google API key
                </button>{" "}
                to get started.
              </div>
            )}
          </CenterPanel>
        }
        chat={
          <ChatPanel>
            <ChatWindow
              messages={messages}
              isLoading={chatLoading}
              error={chatError}
              onSendMessage={handleSendMessage}
            />
          </ChatPanel>
        }
      />
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        hasApiKey={hasApiKey}
        onApiKeySaved={handleApiKeySaved}
      />
    </>
  );
}

export default App;
