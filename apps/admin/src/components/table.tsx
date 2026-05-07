export function AdminTable({ headers, rows }: { headers: string[]; rows: Array<Array<string | number>> }) {
  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-stone-100 text-xs uppercase text-stone-600">
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-stone-200">
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
