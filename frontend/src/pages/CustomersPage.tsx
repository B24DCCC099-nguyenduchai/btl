import { useEffect, useState } from "react";
import api from "../api/axios";
import { Customer } from "../types";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [address, setAddress] = useState("");

  const load = async () => {
    const res = await api.get("/customers");
    setCustomers(res.data);
  };

  const add = async () => {
    await api.post("/customers", { name, birthYear, address });
    setName("");
    setAddress("");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý khách hàng</h1>

      <div className="bg-white p-4 shadow rounded w-96 mb-5">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="number"
          placeholder="Năm sinh"
          value={birthYear}
          onChange={(e) => setBirthYear(+e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={add} className="bg-blue-500 p-2 text-white w-full">
          Thêm khách hàng
        </button>
      </div>

      <table className="w-full border bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Tên</th>
            <th className="p-2">Năm sinh</th>
            <th className="p-2">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.birthYear}</td>
              <td className="p-2">{c.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
