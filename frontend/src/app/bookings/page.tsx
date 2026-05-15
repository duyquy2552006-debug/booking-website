'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export default function BookingHistoryPage() {
  const { data, isLoading } = useSWR('/bookings/me', fetcher);
  if (isLoading) return <div className='p-6'>Loading booking history...</div>;
  const items = data || [];
  return <main className='mx-auto max-w-4xl p-6'><h1 className='text-2xl font-bold'>Lịch sử booking</h1>{items.length===0?<p className='mt-4'>Bạn chưa có booking nào.</p>:<div className='mt-4 space-y-3'>{items.map((b:any)=><div key={b.id} className='rounded border border-slate-700 p-3'><p>{b.room?.name}</p><p className='text-slate-400'>{b.status}</p></div>)}</div>}</main>;
}
