import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import styles from "@/components/Timer/Timer.module.css";
import { DispatchContext } from "@/context/ticketContext";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility
  const router = useRouter();
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1); //Tæller ned
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(interval);
      setShowPopup(true); //vis popup timer er 0
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const backToStart = () => {
    dispatch({ action: "SET_TIMER", payload: timeLeft }); //Gemmer timer i useContext
    router.push("/");
  };

  // Laver det om til minutter/sekunder
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={styles.timerContainer}>
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>Ups!</h2>
            <p>
              Reservationen er udløbet, gå tibage til start for vælge dine
              billetter igen{" "}
            </p>
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
