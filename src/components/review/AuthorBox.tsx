import type { Author } from '@/types';

interface AuthorBoxProps {
  author: Author;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  const role = author.role.replace(' & Tools', '');

  return (
    <div className="bg-white border border-border rounded-[var(--r-card)] p-6 mb-14 flex flex-col sm:flex-row items-start gap-4">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] text-white shrink-0"
        style={{ backgroundColor: author.avatarBg || 'var(--tint-auto-dot)' }}
      >
        {author.initials}
      </div>

      <div className="flex-1">
        <div className="text-[12px] text-muted mb-0.5">Written by</div>
        <h3 className="text-[17px] font-bold text-ink mb-1.5">
          {author.name}, {role}
        </h3>
        <p className="text-[14px] leading-[22px] text-muted">
          {author.persona}
        </p>
      </div>
    </div>
  );
}
