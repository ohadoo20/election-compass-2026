interface CompassBackdropProps {
  className?: string;
}

/**
 * Large watermark version of CompassMark, for the dark top of the mobile
 * home hero — replaces the Star of David flag art there. Light strokes (this
 * sits on --color-navy, not the page's light background), radial-fade
 * masked like StaticFlagBackdrop so it dissolves at the edges instead of
 * ending in a hard circle.
 */
export function CompassBackdrop({ className }: CompassBackdropProps) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 480 480"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="compass-backdrop-fade" cx="50%" cy="50%" r="65%">
            <stop offset="45%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="compass-backdrop-mask">
            <rect x="0" y="0" width="480" height="480" fill="url(#compass-backdrop-fade)" />
          </mask>
        </defs>

        <g mask="url(#compass-backdrop-mask)" stroke="white" fill="none">
          <circle cx="240" cy="240" r="200" strokeWidth="1.4" opacity="0.22" />
          <circle cx="240" cy="240" r="150" strokeWidth="1" opacity="0.14" />

          {Array.from({ length: 16 }, (_, i) => (i * 360) / 16).map((deg) => (
            <line
              key={deg}
              x1="240"
              y1="40"
              x2="240"
              y2={deg % 90 === 0 ? "68" : deg % 45 === 0 ? "58" : "50"}
              strokeWidth={deg % 90 === 0 ? 2 : 1}
              opacity={deg % 90 === 0 ? 0.5 : 0.22}
              transform={`rotate(${deg} 240 240)`}
            />
          ))}

          <g opacity="0.9">
            <path d="M240 68 L258 240 L240 240 Z" fill="var(--color-gold)" stroke="none" />
            <path d="M240 240 L258 240 L240 412 Z" fill="white" fillOpacity="0.5" stroke="none" />
            <path d="M240 68 L222 240 L240 240 Z" fill="white" fillOpacity="0.28" stroke="none" />
            <path d="M240 240 L222 240 L240 412 Z" fill="white" fillOpacity="0.14" stroke="none" />
          </g>
          <circle cx="240" cy="240" r="6" fill="var(--color-gold)" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
