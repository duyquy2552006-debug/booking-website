'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function RoomsPage() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['rooms'], queryFn: async () => (await api.get('/rooms')).data.data });
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6">Error loading rooms</div>;
  if (!data.items?.length) return <div className="p-6">No rooms found</div>;
  return <div className="mx-auto max-w-6xl p-6 grid gap-4 md:grid-cols-3">{data.items.map((r: any) => <Link href={`/rooms/${r.id}`} key={r.id} className="rounded border border-slate-700 p-4"><h3>{r.name}</h3><p>{Number(r.price).toLocaleString()}đ</p></Link>)}</div>;
}
