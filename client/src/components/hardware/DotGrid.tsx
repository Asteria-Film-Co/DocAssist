export function DotGrid() {
  return (
    <div className="dot-grid" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid-pattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="1.2" fill="#b8b5ae" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid-pattern)" />
      </svg>
    </div>
  );
}
