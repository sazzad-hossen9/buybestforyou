interface SpecsTableProps {
  specs: Record<string, string>;
}

export function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs);

  return (
    <section id="specifications" className="mb-12 scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-[28px] leading-[34px] font-bold text-ink tracking-tight">
          Specifications
        </h2>
      </div>

      <div className="bg-white border border-border rounded-[var(--r-card)] overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-[14px]">
          <tbody>
            {entries.map(([key, val], idx) => {
              const isEven = idx % 2 === 0;
              return (
                <tr
                  key={key}
                  className={`border-b border-border last:border-b-0 ${
                    isEven ? 'bg-white' : 'bg-surface-muted'
                  }`}
                >
                  <td className="py-3 px-5 font-bold text-ink w-1/3">
                    {key}
                  </td>
                  <td className="py-3 px-5 text-ink font-normal">
                    {val}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
