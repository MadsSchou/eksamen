import React from "react";
import styles from "./styles.module.css";
import { useContext, useReduce } from "react";
import { DispatchContext, StoreContext } from "@/context/ticketContext";

export default function Basket() {
  const state = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  // Check om der er noget i kurven
  const itemInBasket = state.vipTicket > 0 || state.basicTicket > 0 || state.tent3 > 0 || state.tent2 > 0;

  return (
    <div className={styles.card}>
      <div className="basket">
        <h2>Kurv</h2>
        <ul>
          {state.vipTicket > 0 && (
            <li>
              {"Vip Billet"} x {state.vipTicket}
            </li>
          )}
          {state.basicTicket > 0 && (
            <li>
              {"Basic Billet"} x {state.basicTicket}
            </li>
          )}
          {state.tent3 > 0 && (
            <li>
              {"Telt 3 personer"} x {state.tent3}
            </li>
          )}

          {state.tent2 > 0 && (
            <li>
              {"Tent 2 personer"} x {state.tent2}
            </li>
          )}

          {itemInBasket && <li>Booking gebyr: 99,-</li>}
          {itemInBasket ? "" : <li></li>}
        </ul>
      </div>
    </div>
  );
}
