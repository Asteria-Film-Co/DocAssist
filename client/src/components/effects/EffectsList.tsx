import { EFFECTS } from "../../constants/effects";
import { EffectButton } from "./EffectButton";

interface EffectsListProps {
  hasImage: boolean;
  isProcessing: boolean;
  activeEffect: string | null;
  selectedEffect: string | null;
  onEffectClick: (effectId: string) => void;
}

export function EffectsList({
  hasImage,
  isProcessing,
  activeEffect,
  selectedEffect,
  onEffectClick,
}: EffectsListProps) {
  return (
    <div className="effects-list">
      {EFFECTS.map((effect) => (
        <EffectButton
          key={effect.id}
          effect={effect}
          disabled={!hasImage || isProcessing}
          isActive={activeEffect === effect.id}
          isSelected={selectedEffect === effect.id}
          onClick={() => onEffectClick(effect.id)}
        />
      ))}
      {!hasImage && (
        <p className="effects-list__hint">Upload an image to get started</p>
      )}
    </div>
  );
}
