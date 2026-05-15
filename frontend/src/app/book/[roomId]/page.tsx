'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';

export default function BookPage({ params }: { params: { roomId: string } }) {
  const [checkIn, setCheckIn] = useState(''); const [checkOut, setCheckOut] = useState(''); const [guests, setGuests] = useState(1);
  async function submit(e: React.FormEvent) { e.preventDefault(); try { await api.post('/bookings', { roomId: params.roomId, checkIn: new Date(checkIn).toISOString(), checkOut: new Date(checkOut).toISOString(), guests }); toast.success('Booking thành công'); } catch { toast.error('Booking thất bại'); } }
  return <form onSubmit={submit} className="mx-auto mt-10 max-w-md space-y-3 p-4"><h1 className="text-2xl font-bold">Đặt phòng</h1><input type="date" className="w-full rounded p-2 text-black" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} /><input type="date" className="w-full rounded p-2 text-black" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} /><input type="number" className="w-full rounded p-2 text-black" min={1} value={guests} onChange={(e)=>setGuests(Number(e.target.value))} /><button className="rounded bg-cyan-500 px-4 py-2">Xác nhận</button></form>;
}
