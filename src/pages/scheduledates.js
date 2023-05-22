import { useContext, useEffect, useState } from "react";
import styles from "./scheduledates.module.css";
import { imgContext } from "@/context/ImgContext";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [stages, setStages] = useState("Midgard");
  const [chosenSchedule, setChosenSchedule] = useState(["Vælg en scene", {}]);

  const { images } = useContext(imgContext);

  useEffect(() => {
    fetch("https://charm-pale-tub.glitch.me/schedule")
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

  const [favorite, setFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  const renderTimeSlots = (timeSlots) => {
    return (
      <div className={styles["time-slots"]}>
        {timeSlots?.map((timeSlot) => {
          const imgForBand = images.filter(
            (band) => band.name === timeSlot?.act
          );

          if (timeSlot.act === "break") {
            return (
              <div
                key={`${timeSlot.start}-${timeSlot.end}`}
                className={`${styles["time-slot"]} ${styles["break-time-slot"]}`}
              >
                <div
                  className={styles["time-range"]}
                >{`${timeSlot.start} - ${timeSlot.end}`}</div>
                <div className={styles["act-details"]}></div>
                <div className={styles["break-indicator"]}>Break</div>
              </div>
            );
          }

          return (
            <div
              key={`${timeSlot.start}-${timeSlot.end}`}
              className={styles["time-slot"]}
            >
              <div className={styles["svg-container"]}>
                <svg
                  className={`${styles.favorite} ${
                    favorite ? styles.active : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill={favorite ? "red" : "white"}
                  viewBox="0 0 16 16"
                  onClick={handleFavoriteClick}
                >
                  <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                </svg>
              </div>
              <div
                className={styles["time-range"]}
              >{`${timeSlot.start} - ${timeSlot.end}`}</div>
              <div className={styles["act-details"]}>
                <div>
                  <img
                    width={"100%"}
                    src={
                      imgForBand[0]?.logo ||
                      imgForBand[0]?.logoCredits.split(", ")[2]
                    }
                    loading="lazy"
                  />
                  <p>{timeSlot.act}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className={styles.contentSchedule}>
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
              <h1>Stage: {chosenSchedule[0]}</h1>
              <div className={styles.calendar}>{renderCalendar()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
