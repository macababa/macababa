import React, { useEffect, useState } from "react";

function TimerDisplay() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetTime, setTargetTime] = useState(null);

  const updateTimerFromStorage = () => {
    const stored = localStorage.getItem("timerData");
    if (stored) {
      try {
        const { targetTime: newTarget } = JSON.parse(stored);
        if (Number(newTarget) !== targetTime) {
          setTargetTime(Number(newTarget));
        }
      } catch (e) {
        console.error("Hatalı timerData:", stored);
      }
    }
  };

  useEffect(() => {
    updateTimerFromStorage();

    // storage event dinleyici (diğer sekmeden başlatma için)
    const handleStorageChange = (e) => {
      if (e.key === "timerData") {
        updateTimerFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // embed sayfa targetTime değişmiş mi diye sürekli kontrol eder
    const syncInterval = setInterval(() => {
      updateTimerFromStorage();
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(syncInterval);
    };
  }, [targetTime]);

  useEffect(() => {
    if (!targetTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((targetTime - now) / 1000));
      setTimeLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const isEnding = timeLeft <= 10 && timeLeft > 0;
  const isFinished = timeLeft === 0;
  const textColor = isEnding || isFinished ? "red" : "#fff";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          color: textColor,
        }}
      >
        {isEnding && <span style={{ fontSize: "64px" }}>⚠️</span>}

        <div
          key={timeLeft}
          className={isFinished ? "shake-fade" : isEnding ? "pop" : ""}
          style={{
            fontSize: isFinished ? "120px" : "160px",
            fontWeight: "bold",
            color: textColor,
            textAlign: "center",
          }}
        >
          {isFinished ? "DAK LOSE 😭" : formatTime(timeLeft)}
        </div>

        {isEnding && <span style={{ fontSize: "64px" }}>⚠️</span>}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
          }

          .pop {
            animation: pop 1s ease-in-out infinite;
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            50% { transform: translateX(6px); }
            75% { transform: translateX(-3px); }
          }

          .shake-fade {
            animation: fadeIn 1.2s ease-in-out forwards, shake 0.4s infinite;
          }
        `}
      </style>
    </div>
  );
}

export default TimerDisplay;
