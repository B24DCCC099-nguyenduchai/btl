import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      nav("/products");
    } catch {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Đăng nhập</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUser(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPass(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
