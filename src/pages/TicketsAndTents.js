import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "./TicketsAndTents.module.css";
import { useContext, useState } from "react";
import Basket from "../components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";
import { DispatchContext, StoreContext } from "@/context/ticketContext";
import { useRouter } from "next/router";

//Bliver denne brugt?
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [basicCounter, setBasicCounter] = useState(0);
  const [vipCounter, setVipCounter] = useState(0);
  const [showTents, setShowTents] = useState(false);
  const router = useRouter();

  const handleCounterChange = (type, action) => {
    if (type === "basic") {
      setBasicCounter((Counter) => (action === "plus" ? Counter + 1 : Counter - 1));
      addToBasket();
    } else if (type === "vip") {
      setVipCounter((Counter) => (action === "plus" ? Counter + 1 : Counter - 1));
      addToBasket();
    }
  };

  const handleToggleTents = () => {
    setShowTents(!showTents);
  };

  const dispatch = useContext(DispatchContext);

  const addToBasket = () => {
    dispatch({
      action: "ADD_TO_BASKET",
      payload: {
        basicTicket: basicCounter,
        vipTicket: vipCounter,
      },
    });
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
          <div className={styles.container}>
            <div className={styles.card}>
              <img src="/assets/basic.png" alt="Basic Ticket" />
              <div className={styles.counter}>
                <button onClick={() => handleCounterChange("basic", "minus")}>-</button>
                <span>{basicCounter}</span>
                <button onClick={() => handleCounterChange("basic", "plus")}>+</button>
              </div>
            </div>
            <div className={styles.card}>
              <img src="/assets/vip.png" alt="VIP Ticket" />
              <div className={styles.counter}>
                <button onClick={() => handleCounterChange("vip", "minus")}>-</button>
                <span>{vipCounter}</span>
                <button onClick={() => handleCounterChange("vip", "plus")}>+</button>
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
          <Basket basicCounter={basicCounter} vipCounter={vipCounter} />
          <div className={styles.centerButton}>
            <button
              onClick={() => {
                {
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
