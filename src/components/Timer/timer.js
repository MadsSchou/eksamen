import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import styles from "@/components/Timer/Timer.module.css";
import { DispatchContext } from "@/context/ticketContext";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility
  const router = useRouter();
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(interval);
      setShowPopup(true); // Show the popup when the timer reaches 0
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const backToStart = () => {
    dispatch({ action: "SET_TIMER", payload: timeLeft });
    router.push("/");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={styles.timerContainer}>
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>Ups!</h2>
            <p>Reservationen er udløbet, gå tibage til start for vælge dine billetter igen </p>
            <button onClick={backToStart}>Forside</button>
          </div>
        </div>
      )}
      Tid til at gennemføre ordren <br></br>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
