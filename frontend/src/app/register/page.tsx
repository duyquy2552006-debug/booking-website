'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  async function submit(e: React.FormEvent) { e.preventDefault(); try { await api.post('/auth/register', { name, email, password }); toast.success('Đăng ký thành công'); } catch { toast.error('Đăng ký thất bại'); } }
  return <form onSubmit={submit} className="mx-auto mt-20 max-w-md space-y-3 p-4"><input className="w-full rounded p-2 text-black" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><input className="w-full rounded p-2 text-black" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><input className="w-full rounded p-2 text-black" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><button className="rounded bg-cyan-500 px-4 py-2">Register</button></form>;
}
