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
    let chosenSchedule = Object.entries(schedule).find((item) => item[0] === stage);
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
          <div key={`${timeSlot.start}-${timeSlot.end}`} className={styles["time-slot"]}>
            <div className={styles["time-range"]}>{`${timeSlot.start} - ${timeSlot.end}`}</div>
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
              <h1>{chosenSchedule[0]}</h1>
              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "90%",
                  }}
                  className="days"
                >
                  {Object.entries(chosenSchedule[1])?.map((days) => {
                    return (
                      <div>
                        <div>{days[0]}</div>
                        <div className="acts">
                          {days[1]?.map((act) => {
                            console.log(act);
                            return (
                              <div>
                                <p style={{ width: "200px", fontSize: ".5em" }}>{act?.act}</p>
                                <br />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div className="time">00:00</div>
                  <br />
                  <div className="time">02:00</div>
                  <br />
                  <div className="time">04:00</div>
                  <br />
                  <div className="time">06:00</div>
                  <br />
                  <div className="time">08:00</div>
                  <br />
                  <div className="time">10:00</div>
                  <br />
                  <div className="time">12:00</div>
                  <br />
                  <div className="time">14:00</div>
                  <br />
                  <div className="time">16:00</div>
                  <br />
                  <div className="time">18:00</div>
                  <br />
                  <div className="time">20:00</div>
                  <br />
                  <div className="time">22:00</div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
