"use client";

import React, { useState, useEffect } from "react";

interface CountdownProps {
  endTime: number;
}

const Countdown: React.FC<CountdownProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const diff = endTime - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / 86400),
          hours: Math.floor((diff % 86400) / 3600),
          minutes: Math.floor((diff % 3600) / 60),
          seconds: diff % 60
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex justify-center space-x-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-4xl font-bold text-white mb-1">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="text-sm uppercase text-gray-500">{unit}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
