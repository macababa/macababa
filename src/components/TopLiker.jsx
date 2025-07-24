import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // yıldız simgesi için

function TopLiker() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.topUsers) {
        setTopUsers(data.topUsers);
      }
    };

    return () => ws.close();
  }, []);

  // Stil: index'e göre çerçeve ve yıldız rengi belirle
  const getFrameStyle = (index) => {
    switch (index) {
      case 0:
        return "border-yellow-400 text-yellow-300";
      case 1:
        return "border-gray-300 text-gray-300";
      case 2:
        return "border-orange-500 text-orange-400";
      default:
        return "border-gray-800 text-white";
    }
  };

  return (
    <div className="flex flex-col items-center justify-start pt-10 space-y-6">
      <h1 className="text-3xl font-bold text-red-500">Top Liker</h1>

      <div className="p-6 rounded-lg shadow-lg border-4 border-red-500 w-80 bg-gray-900 text-white">
        {topUsers.length === 0 ? (
          <p className="text-center text-gray-400">Henüz beğeni yok</p>
        ) : (
          <ul className="space-y-2">
            {topUsers.map((user, index) => (
              <li
                key={index}
                className={`flex justify-between items-center px-3 py-2 rounded-md border-2 ${getFrameStyle(index)}`}
              >
                <div className="flex items-center gap-2">
                  {index < 3 && <FaStar />}
                  <span>{user.user}</span>
                </div>
                <span>{user.likes} ❤️</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopLiker;
