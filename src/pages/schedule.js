import React from "react";
import styles from "./Schedule.module.css";

function Schedule({ data }) {
  return (
    <div className={`${styles.overskrift}`}>
      <h1>Schedule</h1>
      <button>Bands</button>
      <button>Tidsplan</button>
      <div className={`${styles.grid} ${styles.bandGrid}`}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.logo} alt={item.name} style={{ maxWidth: "100%" }} />
            <h2>{item.name}</h2>
            {/* <p>Members: {item.members}</p>
          <p>Genre: {item.genre}</p>
          <p>Bio: {item.bio}</p>
          <p>Slug: {item.slug}</p>
          <p>Logo Credits: {item.logocredits}</p> */}
          </div>
        ))}
      </div>{" "}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8080/bands");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Schedule;
