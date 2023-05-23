import React from "react";
import styles from "./styles.module.css";

const Ordreoversigt = () => {
  return (
    <div className={styles.card}>
      <h1 className={styles.heading}>Ordreoversigt</h1>
      <p className={styles.text}>Telte:</p>
      <p className={styles.text}>Camping område:</p>
      <p className={styles.text}>GreenCamping:</p>
      <p className={styles.text}>Booking fee:</p>
      <p className={styles.text}>Samlet beløb:</p>
    </div>
  );
};

export default Ordreoversigt;
