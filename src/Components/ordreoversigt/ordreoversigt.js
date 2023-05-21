import React from "react";
import styles from "./styles.module.css";
import { useContext } from "react";
import { StoreContext } from "@/context/ticketContext";

export default function Basket() {
  const state = useContext(StoreContext);

  return (
    <div className={styles.card}>
      <div className="basket">
        <h2>Kurv</h2>
        <ul>
          {state.basket.map((item) => {
            return (
              <li>
                {item.vipCounter}
                {"Vip Billet"} x {item.amount}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
