import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/firebase";
import React, { useEffect, useState } from "react";

export default function dashboard() {
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
  }, [setLoggedUserDb]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("favList")
      .get()
      .then((res) => {
        setMyFav(res.docs);
      });
  }, [setMyFav]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hej {loggedUserDb?.name}</p>

      <div>
        <h2>Your favs</h2>
        {myFav?.map((fav) => {
          let band = fav.data();

          console.log(fav.data());
          return (
            <>
              <p>{band?.act}</p>
            </>
          );
        })}
      </div>

      <button
        onClick={() => {
          auth.signOut();
          window.location.href = "/";
        }}
      >
        Log Out
      </button>
    </div>
  );
}

/* Start på set Fave - lav en component med ikon.

db.collection("users")
  .doc(user.uid)
  .update({
    fav: [...loggedUser.fav, "new fav"],
  }); */
