import Link from 'next/link';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className = '', light = true }: LogoProps) {
  const strokeColor = light ? '#FFFFFF' : '#1A1D21';
  const textColor = light ? '#FFFFFF' : '#1A1D21';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 select-none focus:outline-none ${className}`}
      aria-label="buybestforyou home"
    >
      {/* Exact Vector Camera/Gadget Mark from design screenshots */}
      <svg
        width="34"
        height="26"
        viewBox="0 0 34 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Main camera body */}
        <rect
          x="1"
          y="3"
          width="24"
          height="18"
          rx="3"
          stroke={strokeColor}
          strokeWidth="1.75"
        />
        {/* Top button/dial */}
        <rect
          x="5"
          y="1"
          width="5"
          height="2"
          rx="0.75"
          fill={strokeColor}
        />
        {/* Lens cone right */}
        <path
          d="M25 7.5L32 4.5V19.5L25 16.5V7.5Z"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Lens aperture circle */}
        <circle
          cx="15.5"
          cy="12"
          r="3"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        {/* Sensor dash */}
        <line
          x1="5"
          y1="12"
          x2="9.5"
          y2="12"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Bottom dotted strip */}
        <line
          x1="4"
          y1="18"
          x2="10"
          y2="18"
          stroke={strokeColor}
          strokeWidth="1.25"
          strokeDasharray="1.5 2"
        />
      </svg>

      {/* Wordmark typography */}
      <span
        className="text-[17px] sm:text-[19px] font-normal tracking-[0.06em] lowercase"
        style={{ color: textColor }}
      >
        buybestforyou
      </span>
    </Link>
  );
}
