import Head from "next/head";
import styles from "./TicketsAndTents.module.css";
import { useContext, useState, useEffect } from "react";
import Basket from "../components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";
import { DispatchContext } from "@/context/ticketContext";
import { useRouter } from "next/router";

export default function Home() {
  const [basicCounter, setBasicCounter] = useState(0);
  const [vipCounter, setVipCounter] = useState(0);
  const [tentCounter2, setTents2] = useState(0);
  const [tentCounter3, setTents3] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const nextButtonClass = canProceed ? styles.clickableNextButton : styles.nextButton;

  const router = useRouter();

  useEffect(() => {
    // Tjekker om der er billetter valgt
    const hasSelectedTickets = basicCounter > 0 || vipCounter > 0;

    // Udregner det totale antal personer/billetter
    const totalPeople = basicCounter + vipCounter;

    // Beregner antallet af teltpladser
    const availableSpaces = tentCounter2 * 2 + tentCounter3 * 3;

    // Tjekker om antallet af telte matcher antallet af personer, og om der kun er en billet valgt
    const tentCountMatches = (totalPeople === 1 && availableSpaces >= 1) || (totalPeople > 1 && availableSpaces >= totalPeople && availableSpaces <= totalPeople + 1);

    if (hasSelectedTickets && tentCountMatches) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [basicCounter, vipCounter, tentCounter2, tentCounter3]);

  //Basic billet
  const handleBasicPlus = () => {
    setBasicCounter(basicCounter + 1);
    addToBasket("basicTicket");
  };

  const handleBasicMinus = () => {
    if (basicCounter > 0) {
      setBasicCounter(basicCounter - 1);
      removeFromBasket("basicTicket");
    }
  };

  // VIP billet
  const handleVipPlus = () => {
    setVipCounter(vipCounter + 1);
    addToBasket("vipTicket");
  };

  const handleVipMinus = () => {
    if (vipCounter > 0) {
      setVipCounter(vipCounter - 1);
      removeFromBasket("vipTicket");
    }
  };

  //Telt 2 pers.
  const handleTentPlus2 = () => {
    setTents2(tentCounter2 + 1);
    addToBasket("tent2");
  };

  const handleTentMinus2 = () => {
    if (tentCounter2 > 0) {
      setTents2(tentCounter2 - 1);
      removeFromBasket("tent2");
    }
  };

  //Telt 3 pers.
  const handleTentPlus3 = () => {
    setTents3(tentCounter3 + 1);
    addToBasket("tent3");
  };

  const handleTentMinus3 = () => {
    if (tentCounter3 > 0) {
      setTents3(tentCounter3 - 1);
      removeFromBasket("tent3");
    }
  };

  const dispatch = useContext(DispatchContext);

  const addToBasket = (key) => {
    dispatch({
      action: "ADD_TO_BASKET",
      payload: {
        key: key,
      },
    });
  };

  const removeFromBasket = (key) => {
    dispatch({
      action: "REMOVE_ONE_FROM_BASKET",
      payload: {
        key: key,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.flow}>
        <Flow step={0} />
      </div>

      <div className={styles.containerGrid}>
        <div className={styles.counterContainer}>
          <div className={styles.card}>
            <img src="/assets/basic.svg" alt="Basic Ticket" />
            <h3>Basic Partout</h3>
            <h3>799,-</h3>
            <div className={styles.counter}>
              <button onClick={handleBasicMinus}>-</button>
              <span>{basicCounter}</span>
              <button onClick={handleBasicPlus}>+</button>
            </div>
          </div>

          <div className={styles.card}>
            <img src="/assets/vip.svg" alt="VIP Ticket" />
            <h3>VIP Partout</h3>
            <h3>1299,-</h3>
            <div className={styles.counter}>
              <button onClick={handleVipMinus}>-</button>
              <span>{vipCounter}</span>
              <button onClick={handleVipPlus}>+</button>
            </div>
          </div>

          <div className={styles.card}>
            <img src="/assets/tent2.jpg" alt="Tent" />
            <h3>2 pers. Telt (inkl. opsætning)</h3>
            <h3>299,-</h3>
            <div className={styles.counter}>
              <button onClick={handleTentMinus2}>-</button>
              <span>{tentCounter2}</span>
              <button onClick={handleTentPlus2}>+</button>
            </div>
          </div>

          <div className={styles.card}>
            <img src="/assets/tent3.jpg" alt="Tent" />
            <h3>3 pers. Telt (inkl. opsætning)</h3>
            <h3>399,-</h3>
            <div className={styles.counter}>
              <button onClick={handleTentMinus3}>-</button>
              <span>{tentCounter3}</span>
              <button onClick={handleTentPlus3}>+</button>
            </div>
          </div>
        </div>

        <div className={styles.basketContainer}>
          <div className={styles.basket}>
            <Basket basicCounter={basicCounter} vipCounter={vipCounter} />
          </div>

          <div className={nextButtonClass}>
            <button
              onClick={() => {
                router.push("/CampgroundForm");
              }}
              disabled={!canProceed}
            >
              Næste
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
