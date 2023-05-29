import React, { useContext } from "react";
import styles from "./styles.module.css";
import { DispatchContext, StoreContext } from "@/context/ticketContext";

export default function Basket() {
  const state = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  // Checker om der er noget i kurven
  const itemInBasket =
    state.vipTicket > 0 ||
    state.basicTicket > 0 ||
    state.tent3 > 0 ||
    state.tent2 > 0 ||
    state.grenCamping > 0;

  // // Udregner valgte billet pris
  // const chosenTicketAmount = (dispatch.state?.basicCounter ?? 0) + (dispatch.state?.vipCounter ?? 0) + (dispatch.state?.tent2 ?? 0) + (dispatch.state?.tent3 ?? 0);

  // Definere priser
  const vipTicketPrice = 1299;
  const basicTicketPrice = 799;
  const tent2Price = 299;
  const tent3Price = 399;
  const greenCamingPrice = 249;

  //Udregner den totale pris
  const totalPrice =
    state.vipTicket * vipTicketPrice +
    state.basicTicket * basicTicketPrice +
    state.tent3 * tent3Price +
    state.tent2 * tent2Price +
    state.greenCamping * greenCamingPrice +
    (itemInBasket ? 99 : 0); // Tilføjer booking fee, hvis der er noget i kurven

  return (
    <div className={styles.card}>
      <h3>Ordreoversigt</h3>
      <ul>
        {state.vipTicket > 0 && (
          <li>
            <span>Vip Billet</span>
            <span className={styles.divide}>
              {state.vipTicket * vipTicketPrice}
            </span>
          </li>
        )}
        {state.basicTicket > 0 && (
          <li>
            <span>Basic Billet</span>
            <span className={styles.divide}>
              {state.basicTicket * basicTicketPrice}
            </span>
          </li>
        )}
        {state.tent3 > 0 && (
          <li>
            <span>Telt 3 personer</span>
            <span className={styles.divide}>{state.tent3 * tent3Price}</span>
          </li>
        )}
        {state.tent2 > 0 && (
          <li>
            <span>Telt 2 personer</span>
            <span className={styles.divide}>{state.tent2 * tent2Price}</span>
          </li>
        )}
        {state.greenCamping > 0 && (
          <li>
            <span>Green Camping</span>
            <span className={styles.divide}>
              {state.greenCamping * greenCamingPrice}
            </span>
          </li>
        )}
        {itemInBasket && (
          <li>
            <span>Booking gebyr</span>
            <span className={styles.divide}>99</span>
          </li>
        )}
        {!itemInBasket && <li></li>}
        <li className={styles.bold}>
          <br></br>
          <span>I alt:</span>
          <span className={styles.divide}>{totalPrice} DKK</span>
        </li>
      </ul>
    </div>
  );
}
