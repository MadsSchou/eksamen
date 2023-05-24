import React, { useContext } from "react";
import styles from "./styles.module.css";
import { DispatchContext, StoreContext } from "@/context/ticketContext";

export default function Basket() {
  const state = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  // Checker om der er noget i kurven
  const itemInBasket = state.vipTicket > 0 || state.basicTicket > 0 || state.tent3 > 0 || state.tent2 > 0;

  // Udregner valgte billet pris
  const chosenTicketAmount = (dispatch.state?.basicCounter ?? 0) + (dispatch.state?.vipCounter ?? 0) + (dispatch.state?.tent2 ?? 0) + (dispatch.state?.tent3 ?? 0);

  // Definere priser
  const vipTicketPrice = 1299;
  const basicTicketPrice = 799;
  const tent2Price = 299;
  const tent3Price = 399;

  //Udregner den totale pris
  const totalPrice = state.vipTicket * vipTicketPrice + state.basicTicket * basicTicketPrice + state.tent3 * tent3Price + state.tent2 * tent2Price + (itemInBasket ? 99 : 0); // Tilføjer booking fee, hvis der er noget i kurven

  return (
    <div className={styles.card}>
      <div className="basket">
        <h2>Kurv</h2>
        <ul>
          {state.vipTicket > 0 && (
            <li>
              {"Vip Billet"} {state.vipTicket * vipTicketPrice}
            </li>
          )}
          {state.basicTicket > 0 && (
            <li>
              {"Basic Billet"} {state.basicTicket * basicTicketPrice}
            </li>
          )}
          {state.tent3 > 0 && (
            <li>
              {"Telt 3 personer"} {state.tent3 * tent3Price}
            </li>
          )}
          {state.tent2 > 0 && (
            <li>
              {"Tent 2 personer"} {state.tent2 * tent2Price}
            </li>
          )}
          {itemInBasket && <li>Booking gebyr: 99,-</li>}
          {!itemInBasket && <li></li>}
          <li>I alt: {totalPrice} DKK</li> {/* Viser total pris*/}
        </ul>
      </div>
    </div>
  );
}
