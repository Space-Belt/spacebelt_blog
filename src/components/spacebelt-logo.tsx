export function SpacebeltLogo() {
  return (
    <svg
      className="spacebelt-logo"
      viewBox="0 0 48 48"
      role="img"
      aria-label="Spacebelt logo"
    >
      <defs>
        <linearGradient id="spacebeltPlanet" x1="12" y1="10" x2="36" y2="38">
          <stop offset="0" stopColor="#8cf5df" />
          <stop offset="0.58" stopColor="#58e0c4" />
          <stop offset="1" stopColor="#087866" />
        </linearGradient>
        <linearGradient id="spacebeltBelt" x1="7" y1="29" x2="42" y2="18">
          <stop offset="0" stopColor="#f7c948" />
          <stop offset="0.55" stopColor="#ffe59a" />
          <stop offset="1" stopColor="#ff6b6b" />
        </linearGradient>
      </defs>
      <path
        className="spacebelt-logo__orbit"
        d="M5.5 28.5c8.2 7.8 26.7 7.1 37-1.6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <circle cx="24" cy="24" r="13.5" fill="url(#spacebeltPlanet)" />
      <path
        d="M10.2 26.9c7.7 4.3 20.1 3.8 28.2-1.1 1.4-.8 2.4-1.6 3.1-2.4.7 1.5.1 3.1-1.8 4.5-7.7 5.9-25.9 6.3-33.1.7-1.4-1.1-1.8-2.3-1.2-3.4 1.1.6 2.6 1.2 4.8 1.7Z"
        fill="url(#spacebeltBelt)"
      />
      <rect
        x="27.8"
        y="27.8"
        width="7.5"
        height="4.4"
        rx="1.5"
        fill="#11161b"
        stroke="#ffe59a"
        strokeWidth="1.3"
        transform="rotate(-10 31.55 30)"
      />
      <circle cx="19.3" cy="21.7" r="1.4" fill="#11161b" opacity="0.72" />
      <circle cx="28.7" cy="21.7" r="1.4" fill="#11161b" opacity="0.72" />
      <path
        d="M21 26.8c1.8 1.4 4.3 1.4 6.1 0"
        fill="none"
        stroke="#11161b"
        strokeLinecap="round"
        strokeWidth="1.5"
        opacity="0.68"
      />
      <path d="M38.5 9.2 40 12l3 1.4-3 1.4-1.5 2.8-1.5-2.8-3-1.4 3-1.4 1.5-2.8Z" fill="#f7c948" />
      <circle cx="11.5" cy="12.5" r="1.8" fill="#ff6b6b" />
    </svg>
  );
}
