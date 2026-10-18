interface ScoreBarItem {
  label: string;
  weight?: number;
  score: number;
  maxScore?: number;
}

interface ScoreBarsProps {
  items: ScoreBarItem[];
  className?: string;
}

export function ScoreBars({ items, className = '' }: ScoreBarsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const max = item.maxScore || 5.0;
        const percentage = Math.min(Math.max((item.score / max) * 100, 0), 100);

        return (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center justify-between text-[14px] md:text-[15px]">
              <span className="font-semibold text-ink">
                {item.label}
                {item.weight !== undefined && (
                  <span className="text-muted font-normal ml-1">
                    ({item.weight}%)
                  </span>
                )}
              </span>
              <span className="font-bold text-ink">
                {item.score.toFixed(1)}
              </span>
            </div>
            {/* Visual Bar Track */}
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div
                className="bg-score h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
