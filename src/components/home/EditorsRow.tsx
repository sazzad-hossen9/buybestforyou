import type { Author } from '@/types';

interface EditorsRowProps {
  authors: Author[];
}

export function EditorsRow({ authors }: EditorsRowProps) {
  return (
    <section className="section-tint">
      <div className="container-page">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <h2 className="h-2 mb-2">Who is behind each category</h2>
          <p className="text-body text-[#5B6470]">
            Every guide has a named editor. They compile and verify specs, owner reviews and lab data from published sources. They don&apos;t claim hands-on testing they didn&apos;t do.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author) => (
            <div
              key={author.slug}
              className="card bg-white p-6 rounded-2xl flex flex-col justify-between"
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
                <h3 className="h-3 text-[#1A1D21] mb-0.5">{author.name}</h3>
                <p className="text-[13px] font-semibold text-[#2B5D7C] mb-3">
                  {author.role}
                </p>

                {/* Persona Copy */}
                <p className="text-[13.5px] leading-[20px] text-[#5B6470]">
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
