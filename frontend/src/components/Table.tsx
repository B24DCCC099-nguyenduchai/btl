import React from 'react';

interface Props {
  columns: string[];
  data?: any[];
  renderRow: (item: any) => React.ReactNode;
}

export default function Table({ columns, data = [], renderRow }: Props) {
  return (
    <table className="table-auto border-collapse border w-full">
      <thead>
        <tr>
          {columns.map((col, idx) => <th key={idx} className="border px-2 py-1">{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(item => renderRow(item))}
      </tbody>
    </table>
  );
}
