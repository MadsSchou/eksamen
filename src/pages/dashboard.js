import { auth, db } from "@/firebase";
import React, { useEffect, useState } from "react";

export default function dashboard() {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        //db er firestore databasen
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((res) => {
            setLoggedUser(res.data());
          });
      } else {
        console.log("no user");
      }
    });
  }, []);

  console.log(loggedUser);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hej {loggedUser?.name}</p>
    </div>
  );
}

/* Start på set Fave - lav en component med ikon.

db.collection("users")
  .doc(user.uid)
  .update({
    fav: [...loggedUser.fav, "new fav"],
  }); */
