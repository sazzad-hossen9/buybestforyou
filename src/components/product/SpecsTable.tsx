interface SpecsTableProps {
  specs: Record<string, string>;
}

export function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs);

  return (
    <section id="specifications" className="mb-12 scroll-mt-24">
      <div className="mb-4">
        <div className="eyebrow text-[#5B6470] mb-1 font-bold">DETAILED SPECIFICATIONS</div>
        <h2 className="h-2">Product specifications</h2>
      </div>

      <div className="bg-white border border-[#E4E7EB] rounded-[16px] overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-[14px]">
          <tbody>
            {entries.map(([key, val], idx) => {
              const isEven = idx % 2 === 0;
              return (
                <tr
                  key={key}
                  className={`border-b border-[#E4E7EB] last:border-b-0 ${
                    isEven ? 'bg-white' : 'bg-[#F6F7F9]'
                  }`}
                >
                  <td className="py-3 px-5 font-semibold text-[#5B6470] w-1/3">
                    {key}
                  </td>
                  <td className="py-3 px-5 text-[#1A1D21] font-medium">
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
