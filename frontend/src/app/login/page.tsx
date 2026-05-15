'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.data.token);
      toast.success('Đăng nhập thành công');
    } catch {
      toast.error('Đăng nhập thất bại');
    }
  }

  return <form onSubmit={submit} className="mx-auto mt-20 max-w-md space-y-3 p-4"><input className="w-full rounded p-2 text-black" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><input className="w-full rounded p-2 text-black" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><button className="rounded bg-cyan-500 px-4 py-2">Login</button></form>;
}
