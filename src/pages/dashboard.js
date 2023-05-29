import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import FavIcon from "@/components/FavIcon";

export default function Dashboard() {
  const allDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const [loggedUserDb, setLoggedUserDb] = useState({});
  const { currentUser } = useAuth();
  const [myFav, setMyFav] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((res) => {
        setLoggedUserDb(res.data());
      });
  }, [setLoggedUserDb, currentUser]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("favList")
      .get()
      .then((res) => {
        setMyFav(res.docs);
      });
  }, [setMyFav, currentUser]);

  function handleDelete(band) {
    console.log(band);
    db.collection("users")
      .doc(currentUser.uid)
      .collection("favList")
      .doc(band.id)
      .delete()
      .then(() => {
        const removeDeletedBand = myFav.filter(
          (e) => e.data().act !== band.act
        );

        setMyFav(removeDeletedBand);
      });
  }

  if (myFav.length === 0) {
    // Render layout when no favorites are chosen
    return (
      <div className={styles["background_color"]}>
        <div className={styles["content"]}>
          <div className={styles["user_container"]}>
            <div className={styles["user_content"]}>
              <h1 className={styles["hi_user"]}>Hej {loggedUserDb?.name}</h1>{" "}
            </div>
            <button
              className={styles["logout"]}
              onClick={() => {
                auth.signOut();
                window.location.href = "/";
              }}
            >
              Log Out
            </button>
          </div>

          <div className={styles["divider"]}></div>
          <div className={styles["grid_7x1"]}>
            {allDay?.map((day) => {
              return <h3>{day}</h3>;
            })}
          </div>
          <div className={styles["empty_schedule"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            </svg>
            <h2>Din tidsplan er tom!</h2>
            <div className={styles["line"]}></div>
            <p>
              Tilføj de bands du ikke vil gå glip af på <br></br> festivallen,så
              du kan holde styr på dit program. <br></br>
              <a href="/scheduledates">Tilføj favoritter</a>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    // Render layout when favorites are chosen
    return (
      <div className={styles[["background_color"]]}>
        <div className={styles["content"]}>
          <div className={styles["user_container"]}>
            <div className={styles["user_content"]}>
              <h1 className={styles["hi_user"]}>Hej {loggedUserDb?.name}</h1>{" "}
            </div>
            <button
              className={styles["logout"]}
              onClick={() => {
                auth.signOut();
                window.location.href = "/";
              }}
            >
              Log Out
            </button>
          </div>
          <div className={styles["divider"]}></div>
          <h2>Din tidsplan</h2>
          <h3>Alt på et sted</h3>

          <div className={styles["grid_7x1"]}>
            {allDay?.map((day) => {
              const test = myFav.filter((e) => e.data().day === day);

              console.log(test);
              return (
                <div>
                  <h3>{day}</h3>
                  {test?.map((band) => {
                    return (
                      <div>
                        <button onClick={() => handleDelete(band.data())}>
                          Slet
                        </button>
                        <p>{band.data().act}</p>
                        <p>
                          {band.data().start} - {band.data().end}
                        </p>
                        <p>{band.data().stage}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
