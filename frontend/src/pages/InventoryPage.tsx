import React, { useEffect, useState } from "react";
import { getImports, addImport } from "../api/inventoryApi";
import { getProducts } from "../api/productApi";
import { ImportRecord } from "../types/inventory";

export default function InventoryPage(): JSX.Element {
  const [records, setRecords] = useState<ImportRecord[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [code, setCode] = useState("");
  const [lines, setLines] = useState<{ productId: number; quantity: number }[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const r = await getImports();
        setRecords(r || []);
        const p = await getProducts();
        setProducts(p || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  function addLine() {
    setLines([...lines, { productId: products[0]?.id || 0, quantity: 1 }]);
  }
  function updateLine(i: number, v: { productId: number; quantity: number }) {
    const next = [...lines];
    next[i] = v;
    setLines(next);
  }
  function removeLine(i: number) {
    setLines(lines.filter((_, idx) => idx !== i));
  }

  async function submit() {
    if (!code) {
      alert("Nhập mã phiếu");
      return;
    }
    if (!lines.length) {
      alert("Thêm sản phẩm");
      return;
    }

    const payload: ImportRecord = {
      id: 0,
      date: new Date().toISOString(),
      items: lines,
    };

    try {
      await addImport(payload);
      alert("Nhập kho thành công");
      setCode("");
      setLines([]);
      const r = await getImports();
      setRecords(r || []);
    } catch (e) {
      console.error(e);
      alert("Lỗi nhập kho");
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl mb-4">Nhập kho</h3>

      <div className="mb-3">
        <input className="w-full p-2 border rounded" placeholder="Mã phiếu" value={code} onChange={(e) => setCode(e.target.value)} />
      </div>

      {lines.map((ln, i) => (
        <div key={i} className="grid grid-cols-3 gap-2 mb-2">
          <select className="p-2 border rounded" value={String(ln.productId)} onChange={(e) => updateLine(i, { ...ln, productId: Number(e.target.value) })}>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input type="number" value={ln.quantity} min={1} onChange={(e) => updateLine(i, { ...ln, quantity: Number(e.target.value) })} className="p-2 border rounded" />

          <button type="button" onClick={() => removeLine(i)} className="px-3 py-1 bg-red-500 text-white rounded">
            Xóa
          </button>
        </div>
      ))}

      <div className="flex gap-2 mb-6">
        <button onClick={addLine} className="px-3 py-1 bg-blue-600 text-white rounded">
          Thêm dòng
        </button>
        <button onClick={submit} className="px-3 py-1 bg-green-600 text-white rounded">
          Lưu phiếu
        </button>
      </div>

      <h4 className="text-lg mb-2">Lịch sử phiếu nhập</h4>
      <ul>
        {records.map((r) => (
          <li key={r.id} className="border p-2 mb-2">
            <div className="text-sm">Mã: {r.id} — Ngày: {new Date(r.date).toLocaleString()}</div>
            <div className="text-sm">Sản phẩm: {r.items.map((it) => `${it.productId} x${it.quantity}`).join(", ")}</div>
          </li>
        ))}
        {records.length === 0 && <li className="text-gray-500">Không có phiếu nhập</li>}
      </ul>
    </div>
  );
}
