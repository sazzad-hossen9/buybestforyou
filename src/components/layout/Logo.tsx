import Link from 'next/link';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className = '', light = true }: LogoProps) {
  const strokeColor = light ? 'white' : 'var(--ink)';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-[6px] select-none focus:outline-none h-[34px] ${className}`}
      aria-label="buybestforyou home"
    >
      {/* Exact Vector Camera/Gadget Mark from design screenshots (46px x 34px) */}
      <svg
        width="46"
        height="34"
        viewBox="0 0 46 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 w-[46px] h-[34px]"
        aria-hidden="true"
      >
        {/* Main camera body */}
        <rect
          x="1.5"
          y="4.5"
          width="32"
          height="24"
          rx="4"
          stroke={strokeColor}
          strokeWidth="2.2"
        />
        {/* Top button/dial */}
        <rect
          x="6.5"
          y="1.5"
          width="7"
          height="3"
          rx="1"
          fill={strokeColor}
        />
        {/* Lens cone right */}
        <path
          d="M33.5 10.5L43.5 6.5V23.5L33.5 19.5V10.5Z"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Lens aperture circle */}
        <circle
          cx="21"
          cy="16.5"
          r="4.2"
          stroke={strokeColor}
          strokeWidth="2"
        />
        {/* Sensor dash */}
        <line
          x1="7"
          y1="16.5"
          x2="13"
          y2="16.5"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Bottom dotted strip */}
        <line
          x1="6.5"
          y1="23.5"
          x2="14.5"
          y2="23.5"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeDasharray="2 2.5"
        />
      </svg>

      {/* Wordmark typography */}
      <span
        className={`text-[17.8px] leading-[34px] font-normal tracking-[0.005em] lowercase ${light ? 'text-white' : 'text-ink'}`}
      >
        buybestforyou
      </span>
    </Link>
  );
}
