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
      <div>
        <h1>Hej {loggedUserDb?.name}</h1>
        <button
          onClick={() => {
            auth.signOut();
            window.location.href = "/";
          }}
        >
          Log Out
        </button>
        <h2>Din tidsplan</h2>
        <h3>Alt på et sted</h3>
        <div>line</div>

        <div className={styles["grid_7x1"]}>
          {allDay?.map((day) => {
            return <p>{day}</p>;
          })}
        </div>

        <p>No favorites chosen</p>
      </div>
    );
  } else {
    // Render layout when favorites are chosen
    return (
      <div>
        <h1>Hej {loggedUserDb?.name}</h1>
        <button
          onClick={() => {
            auth.signOut();
            window.location.href = "/";
          }}
        >
          Log Out
        </button>
        <h2>Din tidsplan</h2>
        <h3>Alt på et sted</h3>
        <div>line</div>

        <div className={styles["grid_7x1"]}>
          {allDay?.map((day) => {
            const test = myFav.filter((e) => e.data().day === day);

            console.log(test);
            return (
              <div>
                <h2>{day}</h2>
                {test?.map((band) => {
                  return (
                    <div>
                      <button onClick={() => handleDelete(band.data())}>
                        Slet
                      </button>
                      <p>{band.data().act}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div>
          <h2>Your favs</h2>
        </div>
      </div>
    );
  }
}
