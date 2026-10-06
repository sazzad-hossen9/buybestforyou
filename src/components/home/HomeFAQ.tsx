import { Accordion } from '@/components/ui/Accordion';
import type { FAQItem } from '@/types';

interface HomeFAQProps {
  faqs: FAQItem[];
}

export function HomeFAQ({ faqs }: HomeFAQProps) {
  return (
    <section className="section bg-white">
      <div className="container-page max-w-4xl">
        <h2 className="h-2 text-center mb-8">Questions people ask us</h2>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
