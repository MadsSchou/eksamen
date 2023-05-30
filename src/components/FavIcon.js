import React, { useEffect, useState } from "react";
import styles from "../pages/scheduledates.module.css";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";

export default function FavIcon({ data, stage, alreadyFav, day }) {
  const [favorite, setFavorite] = useState(alreadyFav);
  const { currentUser } = useAuth();
  console.log(day);
  function handleFavClick() {
    const bandName = data.act.replaceAll(" ", "+");

    const fancyId = bandName + "_" + data.start + "_" + data.end + "_" + stage;

    if (currentUser) {
      if (favorite) {
        console.log("it now removed");
        db.collection("users")
          .doc(currentUser.uid)
          .collection("favList")
          .doc(fancyId)
          .delete();
      } else {
        console.log("it now added");

        db.collection("users")
          .doc(currentUser?.uid)
          .collection("favList")
          .doc(fancyId)
          .set({
            id: fancyId,
            act: data.act,
            start: data.start,
            end: data.end,
            stage: stage,
            day: day,
          });
      }
      setFavorite(!favorite);
    } else {
      console.log("not sinijodfjdvjo");
    }
  }

  return (
    <div className={styles["svg-container"]}>
      <svg
        className={`${styles.favorite} ${favorite ? styles.active : ""}`}
        onClick={() => handleFavClick()}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={favorite ? "#F5C065" : "white"}
        viewBox="0 0 16 16"
      >
        <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
      </svg>
    </div>
  );
}
