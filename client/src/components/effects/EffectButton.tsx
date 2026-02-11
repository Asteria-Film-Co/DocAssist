import type { Effect } from "../../types/effects";

interface EffectButtonProps {
  effect: Effect;
  disabled: boolean;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function EffectButton({
  effect,
  disabled,
  isActive,
  isSelected,
  onClick,
}: EffectButtonProps) {
  const isStub = effect.apiType === "stub";

  return (
    <button
      className={`effect-btn ${isActive ? "effect-btn--active" : ""} ${isSelected && !isActive ? "effect-btn--selected" : ""} ${isStub ? "effect-btn--stub" : ""}`}
      onClick={onClick}
      disabled={disabled || isStub}
      title={effect.description}
    >
      <span className="effect-btn__icon">{effect.icon}</span>
      <div className="effect-btn__text">
        <span className="effect-btn__name">{effect.name}</span>
        {isActive && (
          <span className="effect-btn__status">Processing...</span>
        )}
      </div>
      <span className="effect-btn__badge">
        {effect.apiType === "veo"
          ? "Video"
          : effect.apiType === "imagen"
            ? "Image"
            : "Soon"}
      </span>
    </button>
  );
}
