import Link from 'next/link';

interface AlternativeItem {
  title: string;
  badge: string;
  score: number;
  tier: string;
  slug?: string;
}

interface AlternativesProps {
  alternatives: AlternativeItem[];
}

export function Alternatives({ alternatives }: AlternativesProps) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="text-[28px] leading-[34px] font-bold text-ink tracking-tight">
          Alternatives
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {alternatives.map((item, idx) => (
          <Link
            key={idx}
            href={item.slug ? `/product/${item.slug}` : '/reviews/best-car-scratch-remover-2026'}
            className="p-5 rounded-[var(--r-card)] bg-white border border-border hover:border-border-input transition-all flex flex-col justify-between shadow-xs group"
          >
            <div>
              <div className="text-[12px] leading-[16px] text-muted mb-2 font-medium">
                {item.badge}
              </div>
              <h3 className="font-bold text-[15px] leading-[20px] text-ink mb-3 group-hover:text-cta transition-colors">
                {item.title}
              </h3>
            </div>

            <div className="text-[13px] leading-[18px] text-muted">
              {item.score} score · {item.tier}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
