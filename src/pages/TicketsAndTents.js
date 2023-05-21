import Head from "next/head";
import styles from "./TicketsAndTents.module.css";
import { useContext, useState } from "react";
import Basket from "../components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";
import { DispatchContext, StoreContext } from "@/context/ticketContext";
import { useRouter } from "next/router";

export default function Home() {
  const [basicCounter, setBasicCounter] = useState(0);
  const [vipCounter, setVipCounter] = useState(0);
  const [tentCounter2, setTents2] = useState(0);
  const [tentCounter3, setTents3] = useState(0);
  const router = useRouter();

  const handleBasicPlus = () => {
    setBasicCounter(basicCounter + 1);
    addToBasket();
  };

  const handleBasicMinus = () => {
    if (basicCounter > 0) {
      setBasicCounter(basicCounter - 1);
      removeFromBasket();
    }
  };

  const handleVipPlus = () => {
    setVipCounter(vipCounter + 1);
    addToBasket();
  };

  const handleVipMinus = () => {
    if (vipCounter > 0) {
      setVipCounter(vipCounter - 1);
      removeFromBasket();
    }
  };

  //Telt 2 pers.
  const handleTentPlus2 = () => {
    setTents2(tentCounter2 + 1);
    addToBasket();
  };

  const handleTentMinus2 = () => {
    if (tentCounter2 > 0) {
      setTents2(tentCounter2 - 1);
      removeFromBasket();
    }
  };

  //Telt 3 pers.
  const handleTentPlus3 = () => {
    setTents3(tentCounter3 + 1);
    addToBasket();
  };

  const handleTentMinus3 = () => {
    if (tentCounter3 > 0) {
      setTents3(tentCounter3 - 1);
      removeFromBasket();
    }
  };

  const dispatch = useContext(DispatchContext);

  const addToBasket = () => {
    dispatch({
      action: "ADD_TO_BASKET",
      payload: {
        basicTicket: basicCounter,
        vipTicket: vipCounter,
        tent2: tentCounter2,
        tent3: tentCounter3,
      },
    });
  };

  const removeFromBasket = () => {
    dispatch({
      action: "REMOVE_ONE_FROM_BASKET",
      payload: {
        basicTicket: basicCounter,
        vipTicket: vipCounter,
        tent2: tentCounter2,
        tent3: tentCounter3,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flow step={0} />

      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.container}>
            <div className={styles.card}>
              <img src="/assets/basic.svg" alt="Basic Ticket" />
              <h3>799,-</h3>
              <div className={styles.counter}>
                <button onClick={handleBasicMinus}>-</button>
                <span>{basicCounter}</span>
                <button onClick={handleBasicPlus}>+</button>
              </div>
            </div>
            <div className={styles.card}>
              <img src="/assets/vip.svg" alt="VIP Ticket" />
              <h3>1299,-</h3>
              <div className={styles.counter}>
                <button onClick={handleVipMinus}>-</button>
                <span>{vipCounter}</span>
                <button onClick={handleVipPlus}>+</button>
              </div>
            </div>
            <div className={styles.card}>
              <img src="/assets/tent2.jpg" alt="Tent" width={300} />
              <h3>2 pers. Telt (inkl. opsætning)</h3>
              <h3>299,-</h3>
              <div className={styles.counter}>
                <button onClick={handleTentMinus2}>-</button>
                <span>{tentCounter2}</span>
                <button onClick={handleTentPlus2}>+</button>
              </div>
            </div>
            <div className={styles.card}>
              <img src="/assets/tent3.jpg" alt="Tent" width={300} />
              <h3>3 pers. Telt (inkl. opsætning)</h3>
              <h3>399,-</h3>
              <div className={styles.counter}>
                <button onClick={handleTentMinus3}>-</button>
                <span>{tentCounter3}</span>
                <button onClick={handleTentPlus3}>+</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <Basket basicCounter={basicCounter} vipCounter={vipCounter} />
          <div className={styles.centerButton}>
            <button
              onClick={() => {
                router.push("/CampgroundForm", "vaelgcamp");
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
