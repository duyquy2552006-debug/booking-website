'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export default function RoomDetail({ params }: { params: { id: string } }) {
  const { data, isLoading } = useSWR(`/rooms/${params.id}`, fetcher);
  if (isLoading) return <div className='p-6'>Loading...</div>;
  const room = data;
  if (!room) return <div className='p-6'>Không tìm thấy phòng.</div>;
  return <main className='mx-auto max-w-4xl p-6'><div className='h-64 rounded bg-slate-800'/><h1 className='mt-4 text-3xl font-bold'>{room.name}</h1><p className='mt-2'>{room.description}</p><a href='/bookings' className='mt-4 inline-block rounded bg-cyan-500 px-4 py-2'>Đặt phòng</a></main>;
}
