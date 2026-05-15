const stats = [
  { label: "Tổng booking", value: "1,240" },
  { label: "Doanh thu", value: "3.2 tỷ" },
  { label: "Phòng trống", value: "89" },
  { label: "Người dùng", value: "5,438" }
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h1 className="text-xl font-bold">Admin</h1>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>Dashboard</li>
            <li>Rooms</li>
            <li>Bookings</li>
            <li>Users</li>
          </ul>
        </aside>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Tổng quan hệ thống</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
