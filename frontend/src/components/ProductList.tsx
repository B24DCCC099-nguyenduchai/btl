import { Product } from "../types";

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <table className="w-full border bg-white shadow">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Tên sản phẩm</th>
          <th className="p-2">Giá</th>
          <th className="p-2">Tồn kho</th>
          <th className="p-2">Hành động</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="p-2">{p.name}</td>
            <td className="p-2">{p.price.toLocaleString()}</td>
            <td className="p-2">{p.stock}</td>
            <td className="p-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 mr-2"
                onClick={() => onEdit(p)}
              >
                Sửa
              </button>
              <button
                className="bg-red-600 text-white px-3 py-1"
                onClick={() => onDelete(p.id!)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
