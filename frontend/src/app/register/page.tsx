'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      toast.success('Đăng ký thành công');
    } catch { toast.error('Đăng ký thất bại'); }
  };

  return <form onSubmit={onSubmit} className="mx-auto mt-20 max-w-md space-y-3 p-4"><h1 className="text-2xl font-bold">Đăng ký</h1><input className="w-full rounded p-2 text-black" placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} /><input className="w-full rounded p-2 text-black" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} /><input className="w-full rounded p-2 text-black" type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} /><button className="rounded bg-cyan-500 px-4 py-2">Đăng ký</button></form>;
}
