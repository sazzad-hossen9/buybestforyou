interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`divide-y divide-[#E4E7EB] border-y border-[#E4E7EB] ${className}`}>
      {items.map((item, idx) => (
        <details
          key={idx}
          className="group py-4.5 cursor-pointer select-none transition-colors"
        >
          <summary className="flex items-center gap-3 list-none font-bold text-[18px] md:text-[20px] text-[#1A1D21] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B5D7C] rounded-lg">
            {/* Triangular arrow matching the screenshot */}
            <span
              className="text-[#1A1D21] text-[13px] transition-transform duration-200 group-open:rotate-90 inline-block"
              aria-hidden="true"
            >
              ▶
            </span>
            <span>{item.question}</span>
          </summary>
          <div className="mt-3 pl-6 text-[15px] md:text-[16px] leading-[26px] text-[#5B6470]">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
