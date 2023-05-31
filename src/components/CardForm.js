import { useState } from "react";
import styles from "./CardForm.module.css";
import { useRouter } from "next/router";
import { DispatchContext, StoreContext } from "@/context/ticketContext";
import { useContext } from "react";

const CardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCVV] = useState("");
  const router = useRouter();
  const state = useContext(StoreContext);

  const handleCardNumberChange = (e) => {
    let input = e.target.value.slice(0, 19); // 19 tegn - 16 tal og 3 mellemrum

    input = input.replace(/\D/g, "");

    // Inindsætter et mellemrum efter hver 4 tal
    input = input.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(input);
  };

  const handleExpiryMonthChange = (e) => {
    const input = e.target.value.slice(0, 2);
    setExpiryMonth(input);
  };

  const handleExpiryYearChange = (e) => {
    const input = e.target.value.slice(0, 2);
    setExpiryYear(input);
  };

  const handleCVVChange = (e) => {
    const input = e.target.value.slice(0, 3);
    setCVV(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", `${expiryMonth}/${expiryYear}`);
    console.log("CVV:", cvv);

    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCVV("");
  };

  const fulfillReservation = (key) => {
    fetch("https://charm-pale-tub.glitch.me/fullfill-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: key,
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.status != 500) {
          console.log("Reservation fulfilled successfully.");
        } else {
          console.error("Failed to fulfill reservation.");
        }
      })
      .catch((error) => {
        console.error("Error occurred during reservation fulfillment:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles["card-form"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="name" className={styles["label"]}>
          Kortholders Fulder Navn:
        </label>
        <input type="text" id="name" className={styles["input"]} />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="cardNumber" className={styles["label"]}>
          Kortnummer:
        </label>
        <input type="text" id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} className={styles["input"]} placeholder="1234-1234-1234-1234" />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="expiryDate" className={styles["label"]}>
          UdløbsDato:
        </label>
        <div className={styles["expiry-date-input"]}>
          <input type="text" id="expiryMonth" value={expiryMonth} onChange={handleExpiryMonthChange} className={styles["input"]} maxLength={2} placeholder="MM" />
          <span className={styles["separator"]}>/</span>
          <input type="text" id="expiryYear" value={expiryYear} onChange={handleExpiryYearChange} className={styles["input"]} maxLength={2} placeholder="YY" />
        </div>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="cvv" className={styles["label"]}>
          CVV:
        </label>
        <input type="text" id="cvv" value={cvv} onChange={handleCVVChange} className={styles["input"]} />
      </div>
      <button
        onClick={() => {
          fulfillReservation(state.resid);
          router.push("./confirmation");
        }}
        className={styles["submitButton"]}
      >
        Gennemfør køb
      </button>
    </form>
  );
};

export default CardForm;
