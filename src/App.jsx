import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link
} from "react-router-dom";

import Timer from "./components/Timer";
import TopLiker from "./components/TopLiker";
import EmbedTimer from "./components/EmbedTimer";

/* ---------------- Home Component ---------------- */
function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20">
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

      <div className="mt-10 md:mt-0">
        <div className="w-80 h-80 bg-gradient-to-tr from-red-600 to-pink-500 rounded-2xl shadow-xl"></div>
      </div>
    </section>
  );
}

/* ---------------- Navbar Component ---------------- */
function Navbar() {
  return (
    <nav className="flex items-start px-8 py-6 bg-black/40 backdrop-blur-lg sticky top-0">
      <div className="flex flex-col gap-4">
        <Link to="/" className="text-3xl font-extrabold text-red-500 mb-4">
          TikDak
        </Link>
        <ul className="flex flex-col gap-4 text-gray-300 font-bold text-lg">
          <li className="bg-gray-800 hover:bg-red-500 hover:text-white transition cursor-pointer text-center py-3 rounded-lg shadow-lg">
            <Link to="/timer">Timer</Link>
          </li>
          <li className="bg-gray-800 hover:bg-red-500 hover:text-white transition cursor-pointer text-center py-3 rounded-lg shadow-lg">
            <Link to="/topliker">TopLiker</Link>
          </li>
          <li className="bg-gray-800 hover:bg-red-500 hover:text-white transition cursor-pointer text-center py-3 rounded-lg shadow-lg">
            <Link to="/satinal">Satın Al</Link>
          </li>
          <li className="bg-gray-800 hover:bg-red-500 hover:text-white transition cursor-pointer text-center py-3 rounded-lg shadow-lg">
            <Link to="/iletisim">İletişim</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* ---------------- AppContent Component ---------------- */
function AppContent() {
  const location = useLocation();
  const hideNavbarOnPaths = ["/embed-timer"];
  const shouldHideNavbar = hideNavbarOnPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/topliker" element={<TopLiker />} />
        <Route path="/embed-timer" element={<EmbedTimer />} />
        {/* Diğer sayfaları buraya ekleyebilirsin */}
      </Routes>
    </div>
  );
}

/* ---------------- Main App Component ---------------- */
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
