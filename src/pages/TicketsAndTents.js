import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./TicketsAndTents.module.css";
import { useContext, useState } from "react";
import Ordreoversigt from "../components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";
import { UpdateContext } from "@/context/ticketContext";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [basicCounter, setBasicCounter] = useState(0);
  const [vipCounter, setVipCounter] = useState(0);
  const [showTents, setShowTents] = useState(false);
  const router = useRouter();

  const handleBasicPlus = () => {
    setBasicCounter(basicCounter + 1);
  };

  const handleBasicMinus = () => {
    setBasicCounter(basicCounter - 1);
  };

  const handleVipPlus = () => {
    setVipCounter(vipCounter + 1);
  };

  const handleVipMinus = () => {
    setVipCounter(vipCounter - 1);
  };

  const handleToggleTents = () => {
    setShowTents(!showTents);
  };

  const dispatch = useContext(UpdateContext);

  const addToBasket = () => {
    dispatch({
      action: "ADD_TO_BASKET",
      payload: {
        basicTicket: basicCounter,
        vipTicket: vipCounter,
      },
    });
    console.log(action, state);
  };

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className={styles.timeline} style={{ display: "flex", justifyContent: "center" }}>
        <img src="assets/step1.png" />
      </div> */}
      <Flow />

      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.container}>
            <div className={styles.card}>
              <img src="/assets/basic.png" alt="Basic Ticket" />
              <div className={styles.counter}>
                <button onClick={handleBasicMinus}>-</button>
                <span>{basicCounter}</span>
                <button onClick={handleBasicPlus}>+</button>
              </div>
            </div>
            <div className={styles.card}>
              <img src="/assets/vip.png" alt="VIP Ticket" />
              <div className={styles.counter}>
                <button onClick={handleVipMinus}>-</button>
                <span>{vipCounter}</span>
                <button onClick={handleVipPlus}>+</button>
              </div>
            </div>
          </div>
          <button onClick={handleToggleTents} className={styles.showTentsButton}>
            Camping for XX Personer ↓
          </button>{" "}
          {showTents ? (
            <div>
              <p>2 pers. Tent (including setup)</p>
              <p>+299,00 kr.</p>
              <p>3 pers. Tent (including setup)</p>
              <p>+399,00 kr.</p>
            </div>
          ) : null}
        </div>
        <div className={styles.column}>
          <Ordreoversigt basicCounter={basicCounter} vipCounter={vipCounter} />
          <div className={styles.centerButton}>
            <button
              onClick={() => {
                {
                  addToBasket();
                }
                // router.push("/CampgroundForm", "vaelgcamp");
              }}
            >
              Reserver Billetter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
