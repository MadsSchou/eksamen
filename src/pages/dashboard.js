import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

export default function Dashboard() {
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
          <p>MON</p>
          <p>TUE</p>
          <p>WED</p>
          <p>THU</p>
          <p>FRI</p>
          <p>SAT</p>
          <p>SUN</p>
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
          <p>MON</p>
          <p>TUE</p>
          <p>WED</p>
          <p>THU</p>
          <p>FRI</p>
          <p>SAT</p>
          <p>SUN</p>
        </div>

        <div>
          <h2>Your favs</h2>
          {myFav?.map((fav) => {
            let band = fav.data();

            console.log(fav.data());
            return (
              <React.Fragment key={fav.id}>
                <p>{band?.act}</p>
                <p>{`${band?.start} - ${band?.end}`}</p>
                <p>Scene: {band?.stage}</p>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
