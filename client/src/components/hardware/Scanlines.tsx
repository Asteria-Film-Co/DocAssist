export function Scanlines() {
  return (
    <div className="scanlines" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="scanline-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="2" fill="rgba(0,0,0,0.06)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#scanline-pattern)" />
      </svg>
    </div>
  );
}
