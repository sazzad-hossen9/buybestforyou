interface ScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg' | number;
  strokeWidth?: number;
  maxScore?: number;
  className?: string;
}

export function ScoreRing({
  score,
  size = 'md',
  strokeWidth: customStrokeWidth,
  maxScore = 5.0,
  className = ''
}: ScoreRingProps) {
  // Dimensions based on size
  const dim = typeof size === 'number' ? size : size === 'sm' ? 44 : size === 'lg' ? 64 : 52;
  const strokeWidth = customStrokeWidth !== undefined
    ? customStrokeWidth
    : typeof size === 'number'
    ? Math.max(3, Math.round(dim / 12))
    : size === 'sm'
    ? 3.5
    : size === 'lg'
    ? 5
    : 4;
  const radius = (dim - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;

  // Percentage filled (clamp 0 to 1)
  const percent = Math.min(Math.max(score / maxScore, 0), 1);
  const strokeDashoffset = circumference - percent * circumference;

  const fontSize = dim < 46 ? 'text-[14px]' : dim >= 60 ? 'text-[22px]' : 'text-[17px]';


  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: dim, height: dim }}
      aria-label={`Score: ${score.toFixed(1)} out of ${maxScore}`}
    >
      <svg
        width={dim}
        height={dim}
        className="-rotate-90 origin-center"
        aria-hidden="true"
      >
        {/* Background Track */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="transparent"
          stroke="#E4E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress Fill */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="transparent"
          stroke="#009E73"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Inner Score Text */}
      <span
        className={`absolute font-extrabold text-[#1A1D21] tracking-tight ${fontSize}`}
      >
        {score.toFixed(1)}
      </span>
    </div>
  );
}
