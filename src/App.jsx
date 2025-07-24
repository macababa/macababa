import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Timer from "./components/Timer";
import TopLiker from "./components/TopLiker";

/* ---------------- Home Component ---------------- */
function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20">
      {/* Text Content */}
      <div className="max-w-xl space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Modern TikDak <span className="text-red-500">UI</span>
        </h2>
        <p className="text-gray-300 text-lg">
          Programı kullanmadan önce Dakyanustan izin almalısın dostum ♥
        </p>
        <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition">
          Explore Now
        </button>
      </div>

      {/* Hero Image */}
      <div className="mt-10 md:mt-0">
        <div className="w-80 h-80 bg-gradient-to-tr from-red-600 to-pink-500 rounded-2xl shadow-xl"></div>
      </div>
    </section>
  );
}

/* ---------------- Navbar Component ---------------- */
function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex items-start px-8 py-6 bg-black/40 backdrop-blur-lg sticky top-0">
      <div className="flex flex-col gap-4">
        <Link to="/" className="text-3xl font-extrabold text-red-500 mb-4">
          TikDak
        </Link>
        <ul className="flex flex-col gap-4">
          <Link
            to="/timer"
            className={`block text-center py-3 rounded-lg shadow-lg transition font-bold text-lg ${
              location.pathname === "/timer"
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-red-500 hover:text-white text-gray-300"
            }`}
          >
            Timer
          </Link>
          <Link
            to="/topliker"
            className={`block text-center py-3 rounded-lg shadow-lg transition font-bold text-lg ${
              location.pathname === "/topliker"
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-red-500 hover:text-white text-gray-300"
            }`}
          >
            TopLiker
          </Link>
          <Link
            to="/satinal"
            className={`block text-center py-3 rounded-lg shadow-lg transition font-bold text-lg ${
              location.pathname === "/satinal"
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-red-500 hover:text-white text-gray-300"
            }`}
          >
            Satın Al
          </Link>
          <Link
            to="/iletisim"
            className={`block text-center py-3 rounded-lg shadow-lg transition font-bold text-lg ${
              location.pathname === "/iletisim"
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-red-500 hover:text-white text-gray-300"
            }`}
          >
            İletişim
          </Link>
        </ul>
      </div>
    </nav>
  );
}



/* ---------------- Main App Component ---------------- */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/topliker" element={<TopLiker />} />
          {/* Diğer sayfalar eklenebilir */}
        </Routes>
      </div>
    </Router>
  );
}
