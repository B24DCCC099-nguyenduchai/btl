import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from './authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      window.location.href = '/';
    } catch (err) {
      alert('Đăng nhập thất bại');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 w-full mb-3" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-3" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Login</button>
      </form>
    </div>
  );
}
