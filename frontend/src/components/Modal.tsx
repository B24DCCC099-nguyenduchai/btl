import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        {title && <h2 className="text-xl mb-4">{title}</h2>}
        {children}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-3 py-1 rounded">Đóng</button>
      </div>
    </div>
  );
}
