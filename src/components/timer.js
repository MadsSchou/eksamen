import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(20);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft === 0) {
        clearTimeout(timer);
        backToStart();
      } else {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const backToStart = () => {
    router.push("/TicketsAndTents");
  };

  // Konverter til minuter og sekunder
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="Timer">
      Tid til at gennemføre ordren: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
