import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Tìm kiếm..."}
      className="border p-2 rounded w-full mb-2"
    />
  );
}
