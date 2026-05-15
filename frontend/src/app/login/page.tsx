'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.data?.token || res.data.token);
      toast.success('Đăng nhập thành công');
    } catch {
      toast.error('Đăng nhập thất bại');
    } finally { setLoading(false); }
  };

  return <form onSubmit={onSubmit} className="mx-auto mt-20 max-w-md space-y-3 p-4"><h1 className="text-2xl font-bold">Đăng nhập</h1><input className="w-full rounded p-2 text-black" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><input className="w-full rounded p-2 text-black" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><button className="rounded bg-cyan-500 px-4 py-2" disabled={loading}>{loading?'Loading...':'Đăng nhập'}</button></form>;
}
