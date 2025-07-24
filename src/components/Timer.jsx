import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(60); // Varsayılan 60 saniye
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState(60);

  // Sayaç çalışması
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Inputtan süreyi ayarla
  const handleSetTime = () => {
    setTime(inputTime);
    setIsActive(false);
  };

  const toggleTimer = () => {
    if (!isActive) {
      const now = new Date().getTime();
      const targetTime = now + time * 1000;
      localStorage.setItem("timerData", JSON.stringify({ targetTime }));
    }
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setTime(inputTime);
    setIsActive(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const isLast10Sec = time <= 10;

  return (
    <div className="flex flex-col items-center justify-start pt-10 space-y-6">
      {/* Başlık */}
      <h1 className="text-3xl font-bold text-red-500">Geri Sayım Sayacı</h1>

      {/* Süreyi Ayarlama */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(Number(e.target.value))}
          className="px-4 py-2 rounded-lg text-black text-lg w-24 text-center"
        />
        <button
          onClick={handleSetTime}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
        >
          Süreyi Ayarla
        </button>
      </div>

      {/* Sayaç */}
      <div className="flex items-center gap-2 text-5xl font-extrabold">
        {time > 0 ? (
          <>
            <span className={isLast10Sec ? "text-red-500" : "text-white"}>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>
            {isLast10Sec && (
              <span className="text-red-500 animate-pulse text-4xl">!</span>
            )}
          </>
        ) : (
          <span className="text-red-500 animate-pulse">Süre Bitti 😢</span>
        )}
      </div>

      {/* Butonlar */}
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition"
        >
          {isActive ? "Duraklat" : "Başlat"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}
