// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:8080/available-spots");
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

//const response = await fetch("http://localhost:8080/reserve-spot", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
// };

import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./CampgroundForm.module.css";
import Ordreoversigt from "../components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";
import React, { useState, useEffect } from "react";
import Area from "@/components/Area";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  const handleButtonClick = async (area) => {
    try {
      const reservePayload = {
        area: "",
        amount: "",
      };
      console.log(area);
      console.log(amount);

      const reserveResponse = await fetch("http://localhost:8080/reserve-spot", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservePayload),
      });

      // Process the reserve response as needed
      const reserveData = await reserveResponse.json();
      const reservationId = reserveData.id;

      const fulfillPayload = {
        id: reservationId,
      };

      const fulfillResponse = await fetch("http://localhost:8080/fulfill-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fulfillPayload),
      });

      // Process the fulfill response as needed
      const fulfillData = await fulfillResponse.json();
      console.log(fulfillData);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flow />

      <div className={styles.container}>
        <div className={styles.column}>
          <button onClick={() => handleButtonClick("Svartheim")}>Svartheim</button>
          <button onClick={() => handleButtonClick("Nilfheim")}>Nilfheim</button>
          <button onClick={() => handleButtonClick("Helheim")}>Helheim</button>
          <button onClick={() => handleButtonClick("Muspelheim")}>Muspelheim</button>
          <button onClick={() => handleButtonClick("Alfheim")}>Alfheim</button>

          {/* <img className={styles.image} src="/assets/map.svg" alt="Map" /> */}
          {/* 
          <div className="area">
            {data.map((area) => (
              <Area {...area} />
            ))}
          </div> */}

          <pre>{JSON.stringify(data, null, 2)}</pre>
          <h1>Do you want to be a part of the green change?</h1>
          <p>The climate crisis is no joke and a big festival like this puts a lot of strain on the ground it’s standing on. Be a part of a greener tomorrow by adding the green camping option, that will be used to compensate any damages to the environment and area caused during the festival.</p>
          <label>
            <input type="checkbox" />
            Add green camping
          </label>
        </div>
        <div className={styles.column}>
          <Ordreoversigt />

          <div className={styles.centerButton}>
            <Link href="/personalinfo">
              <button>Reserver Biletter</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:8080/available-spots");
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

//const response = await fetch("http://localhost:8080/reserve-spot", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
// };
