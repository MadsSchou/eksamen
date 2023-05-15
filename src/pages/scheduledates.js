import { useEffect, useState } from "react";
import styles from "./scheduledates.module.css";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [stages, setStages] = useState("Midgard");
  const [chosenSchedule, setChosenSchedule] = useState(["Vælg en scene", {}]);

  useEffect(() => {
    fetch("http://localhost:8080/schedule")
      .then((response) => response.json())
      .then((data) => {
        setSchedule(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function chooseStage(stage) {
    setStages(stage);
    let chosenSchedule = Object.entries(schedule).find(
      (item) => item[0] === stage
    );
    setChosenSchedule(chosenSchedule);
  }

  const renderCalendar = () => {
    return Object.entries(chosenSchedule[1]).map(([day, timeSlots]) => {
      return (
        <div key={day} className={styles["day-column"]}>
          <h3 className={styles.day}>{day}</h3>
          {renderTimeSlots(timeSlots)}
        </div>
      );
    });
  };

  const renderTimeSlots = (timeSlots) => {
    return (
      <div className={styles["time-slots"]}>
        {timeSlots.map((timeSlot) => (
          <div
            key={`${timeSlot.start}-${timeSlot.end}`}
            className={styles["time-slot"]}
          >
            <div
              className={styles["time-range"]}
            >{`${timeSlot.start} - ${timeSlot.end}`}</div>
            <div className={styles["act-details"]}>
              <p>{timeSlot.act}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <select onChange={(e) => chooseStage(e.target.value)}>
        <option value="Midgard">Vælg stage</option>
        {Object.entries(schedule).map(([stage]) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>
      <div className={styles.schedule}>
        <div>
          <div className={styles.schedulePlan}>
            <div>
              <h1>Stage:{chosenSchedule[0]}</h1>
              <div className={styles.calendar}>{renderCalendar()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
