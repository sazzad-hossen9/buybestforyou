import Link from 'next/link';
import type { Author } from '@/types';

interface AuthorBoxProps {
  author: Author;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <div className="card bg-[#F6F7F9] border border-[#E4E7EB] rounded-[16px] p-6 mb-14 flex flex-col sm:flex-row items-start gap-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-[18px] text-white shrink-0 shadow-xs"
        style={{ backgroundColor: author.avatarBg || '#2E6FA3' }}
      >
        {author.initials}
      </div>

      <div className="flex-1">
        <div className="eyebrow text-[#5B6470] mb-1 font-bold">WRITTEN BY</div>
        <h4 className="text-[18px] font-bold text-[#1A1D21] mb-0.5">
          {author.name}
        </h4>
        <div className="text-[13px] font-semibold text-[#2B5D7C] mb-2">
          {author.role}
        </div>
        <p className="text-[14px] leading-[22px] text-[#5B6470] mb-3">
          {author.persona}
        </p>
        <Link
          href="/about"
          className="text-[13px] font-semibold text-[#2B5D7C] hover:text-[#1A1D21] underline"
        >
          Learn more about our editorial process →
        </Link>
      </div>
    </div>
  );
}
