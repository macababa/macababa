export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20">
      <div className="max-w-xl space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Modern TikDak <span className="text-red-500">UI</span>
        </h2>
        <p className="text-gray-300 text-lg">
          Programı kullanmadan önce Dakyanustan izin almalısın dostum♥
        </p>
        <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition">
          Explore Now
        </button>
      </div>
      <div className="mt-10 md:mt-0">
        <div className="w-80 h-80 bg-gradient-to-tr from-red-600 to-pink-500 rounded-2xl shadow-xl"></div>
      </div>
    </section>
  );
}
