import { Accordion } from '@/components/ui/Accordion';
import type { FAQItem } from '@/types';

interface HomeFAQProps {
  faqs: FAQItem[];
}

export function HomeFAQ({ faqs }: HomeFAQProps) {
  return (
    <section className="py-[var(--section-py)] bg-white">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
        <div className="max-w-4xl">
          <h2 className="text-[length:var(--fs-h2)] leading-[var(--lh-h2)] tracking-[var(--ls-h2)] font-extrabold text-ink text-left mb-8">
            Questions people ask us
          </h2>
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
