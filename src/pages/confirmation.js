import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Flow from "@/components/steps";
import styles from "./Confirmation.module.css"; // Import custom CSS file
import { db } from "@/firebase";
import { StoreContext } from "@/context/ticketContext";

export default function Confirmation() {
  const router = useRouter();

  const data = useContext(StoreContext);

  console.log(data);
  useEffect(() => {
    db.collection("allReservations").add(data);
  }, []);

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flow step={4} />
      <div className={styles.confirmationPage}>
        <h1>Tak for dit køb!</h1>
        <p>Dit køb er bekræftet, find dine biletter på mail</p>
        <button onClick={() => router.push("/")}>
          Gå tilbage til forsiden
        </button>
      </div>
    </>
  );
}
