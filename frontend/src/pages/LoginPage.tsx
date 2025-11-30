import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  const login = () => {
    if (username === "admin" && password === "123") {
      nav("/products");
    } else {
      alert("Sai thông tin đăng nhập!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

