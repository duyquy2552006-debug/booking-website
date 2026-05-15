'use client';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export default function AdminDashboardPage() {
  const { data } = useSWR('/admin/stats', fetcher);
  const stats = [
    { label: 'Tổng booking', value: data?.totalBookings ?? '...' },
    { label: 'Doanh thu', value: data?.totalRevenue ?? '...' },
    { label: 'Phòng trống', value: data?.availableRooms ?? '...' },
    { label: 'Người dùng', value: data?.totalUsers ?? '...' }
  ];
  return <main className='min-h-screen p-6'><h1 className='text-3xl font-bold'>Admin Dashboard</h1><div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>{stats.map((s)=> <div key={s.label} className='rounded-xl border border-slate-700 p-4'><p>{s.label}</p><p className='text-2xl font-bold'>{s.value}</p></div>)}</div></main>;
}
