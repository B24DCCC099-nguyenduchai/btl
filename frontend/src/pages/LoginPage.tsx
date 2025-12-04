import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock auth: username=admin password=admin123
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ username }));
      nav("/products");
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>

        <label className="block text-sm">Tên đăng nhập</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block text-sm">Mật khẩu</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
        </div>
      </form>
    </div>
  );
}
