'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export default function RoomsPage() {
  const { data, isLoading, error } = useSWR('/rooms?page=1&limit=9', fetcher);
  if (isLoading) return <div className='p-6'>Loading rooms...</div>;
  if (error) return <div className='p-6'>Không tải được danh sách phòng.</div>;
  const items = data?.items || [];
  if (!items.length) return <div className='p-6'>Chưa có phòng nào.</div>;
  return <main className='mx-auto max-w-6xl p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>{items.map((r:any)=><a href={`/rooms/${r.id}`} key={r.id} className='rounded border border-slate-700 p-4'><div className='h-32 bg-slate-800 rounded'/><h3 className='mt-2 font-semibold'>{r.name}</h3><p>{r.price}đ</p></a>)}</main>;
}
