'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function BookingHistoryPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['history'], queryFn: async () => (await api.get('/bookings/me')).data.data });
  if (isLoading) return <div className="p-6">Loading history...</div>;
  if (isError) return <div className="p-6">Cannot load history</div>;
  if (!data.length) return <div className="p-6">Chưa có booking nào</div>;
  return <div className="mx-auto max-w-4xl p-6 space-y-3">{data.map((b:any)=><div key={b.id} className="rounded border border-slate-700 p-4"><p>{b.room.name}</p><p>{new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}</p><p>{b.status}</p></div>)}</div>;
}
