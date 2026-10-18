import type { Author } from '@/types';

interface EditorsRowProps {
  authors: Author[];
}

export function EditorsRow({ authors }: EditorsRowProps) {
  return (
    <section className="bg-surface-muted py-10 md:py-14 lg:py-[72px]">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold tracking-tight text-ink mb-2">
            Who is behind each category
          </h2>
          <p className="text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted">
            Every guide has a named editor. They compile and verify specs, owner reviews and lab data from published sources. They don&apos;t claim hands-on testing they didn&apos;t do.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {authors.map((author) => (
            <div
              key={author.slug}
              className="bg-surface border border-border rounded-[var(--r-card)] p-5 shadow-[var(--sh-card)] flex flex-col justify-between"
            >
              <div>
                {/* Initials Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-[16px] mb-4"
                  style={{ backgroundColor: author.avatarBg }}
                >
                  {author.initials}
                </div>

                {/* Name & Title */}
                <h3 className="text-[length:var(--fs-h3)] leading-[var(--lh-h3)] tracking-[var(--ls-h3)] font-bold tracking-tight text-ink mb-0.5">
                  {author.name}
                </h3>
                <p className="text-[13px] font-semibold text-trust mb-3">
                  {author.role}
                </p>

                {/* Persona Copy */}
                <p className="text-[13.5px] leading-[20px] text-muted">
                  {author.persona}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
