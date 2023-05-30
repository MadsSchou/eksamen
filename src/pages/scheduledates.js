import { useContext, useEffect, useState } from "react";
import styles from "./scheduledates.module.css";
import { imgContext } from "@/context/ImgContext";
import FavIcon from "@/components/FavIcon";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [stages, setStages] = useState("Midgard");
  const [chosenSchedule, setChosenSchedule] = useState(["Midgard", []]);
  const { currentUser } = useAuth();
  const { images } = useContext(imgContext);
  const [currentFavList, setCurrentFavList] = useState([]);

  function handleNotLoggedIn() {
    if (currentUser) {
      return;
    } else {
      alert("Du skal oprette dig, for at kunne tilføje til favoritter");
    }
  }

  async function chooseStage(stage) {
    setStages(stage);
    let chosenSchedule = Object.entries(schedule).find(
      (item) => item[0] === stage
    );

    /* 
      const test2 = chosenSchedule[1];
      const test = Object.keys(
        chosenSchedule[1].map((day) => {
        return {
          day,
          items: chosenSchedule[day],
        };
      })
    ); 
    
    console.log(test2);
    */

    setChosenSchedule(chosenSchedule);
  }

  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("favList")
        .get()
        .then((res) => {
          setCurrentFavList(res.docs);
        });
    }
  }, []);

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

  useEffect(() => {
    chooseStage("Midgard");
  }, [schedule]);

  const renderCalendar = () => {
    if (!chosenSchedule) {
      return <div>Loading...</div>;
    }
    return Object.entries(chosenSchedule[1]).map(([day, timeSlots]) => {
      return (
        <div key={day} className={styles["day-column"]}>
          <h3 className={styles.day}>{day}</h3>
          {images && renderTimeSlots(timeSlots, day)}
        </div>
      );
    });
  };

  const renderTimeSlots = (timeSlotsDays, day) => {
    let timeSlots = timeSlotsDays;
    console.log(day);
    return (
      <div className={styles["time-slots"]}>
        {timeSlots?.map((timeSlot) => {
          let alreadyFavListed = false;

          if (currentFavList.find((e) => e.data().act === timeSlot.act)) {
            alreadyFavListed = true;
          }

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
              <div onClick={() => handleNotLoggedIn()}>
                <FavIcon
                  data={timeSlot}
                  stage={stages}
                  alreadyFav={alreadyFavListed}
                  day={day}
                />
              </div>
              <div
                className={styles["time-range"]}
              >{`${timeSlot.start} - ${timeSlot.end}`}</div>
              <div className={styles["act-details"]}>
                <div className={styles["flex-mobile"]}>
                  <img
                    className={styles["band-images"]}
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
      <div className={styles.schedule}>
        <div>
          <div className={styles.schedulePlan}>
            <h1 className={styles.headline}>Tidsplan</h1>
            <select
              className={styles.select}
              onChange={(e) => chooseStage(e.target.value)}
            >
              <option value="">Vælg scene</option>
              {Object.entries(schedule).map(([stage]) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
            <div>
              {/* <h1>Stage: {chosenSchedule[0]}</h1> */}
              <div className={styles.calendar}>{renderCalendar()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
