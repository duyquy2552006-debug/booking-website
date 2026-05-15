'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function RoomDetail({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery({ queryKey: ['room', params.id], queryFn: async () => (await api.get(`/rooms/${params.id}`)).data.data });
  if (isLoading) return <div className="p-6">Loading...</div>;
  return <div className="mx-auto max-w-4xl p-6"><h1 className="text-3xl font-bold">{data.name}</h1><p className="mt-2">{data.description}</p><p className="mt-2 text-cyan-300">{Number(data.price).toLocaleString()}đ/đêm</p><Link href={`/book/${data.id}`} className="mt-4 inline-block rounded bg-cyan-500 px-4 py-2">Đặt phòng</Link></div>;
}
