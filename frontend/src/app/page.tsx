const featuredRooms = [
  { name: "Deluxe Ocean View", price: "1.800.000đ/đêm" },
  { name: "Family Suite", price: "2.600.000đ/đêm" },
  { name: "Business Studio", price: "1.300.000đ/đêm" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-6">
        <h1 className="text-2xl font-bold">StayNow</h1>
        <nav className="hidden gap-6 md:flex">
          <a href="#" className="hover:text-cyan-300">Trang chủ</a>
          <a href="#" className="hover:text-cyan-300">Phòng</a>
          <a href="#" className="hover:text-cyan-300">Liên hệ</a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-4">
        <div className="rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-500 p-8 md:p-12">
          <h2 className="text-3xl font-bold md:text-5xl">Đặt phòng trực tuyến nhanh chóng</h2>
          <p className="mt-4 max-w-2xl text-slate-50/90">Tìm phòng phù hợp với ngân sách, vị trí và nhu cầu chỉ trong vài giây.</p>
          <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-slate-900/30 p-4 md:grid-cols-5">
            <input className="rounded-lg px-3 py-2 text-slate-900" placeholder="Địa điểm" />
            <input className="rounded-lg px-3 py-2 text-slate-900" placeholder="Check-in" />
            <input className="rounded-lg px-3 py-2 text-slate-900" placeholder="Check-out" />
            <input className="rounded-lg px-3 py-2 text-slate-900" placeholder="Số khách" />
            <button className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white">Tìm phòng</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <h3 className="text-2xl font-semibold">Phòng nổi bật</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredRooms.map((room) => (
            <article key={room.name} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="h-40 rounded-lg bg-slate-800" />
              <h4 className="mt-3 font-semibold">{room.name}</h4>
              <p className="text-cyan-300">{room.price}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
