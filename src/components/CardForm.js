import { useState } from "react";
import styles from "./CardForm.module.css";
import { useRouter } from "next/router";

const CardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCVV] = useState("");
  const router = useRouter();

  const handleCardNumberChange = (e) => {
    const input = e.target.value.slice(0, 16); // Limit to 16 characters
    setCardNumber(input);
  };

  const handleExpiryMonthChange = (e) => {
    const input = e.target.value.slice(0, 2); // Limit to 2 characters
    setExpiryMonth(input);
  };

  const handleExpiryYearChange = (e) => {
    const input = e.target.value.slice(0, 2); // Limit to 2 characters
    setExpiryYear(input);
  };

  const handleCVVChange = (e) => {
    const input = e.target.value.slice(0, 3); // Limit to 3 characters
    setCVV(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data (e.g., send it to a server)
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", `${expiryMonth}/${expiryYear}`);
    console.log("CVV:", cvv);

    // Clear the form fields
    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCVV("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles["card-form"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="name" className={styles["label"]}>
          Kortholders Fulder Navn:
        </label>
        <input type="text" id="name" value={cardNumber} onChange={handleCardNumberChange} className={styles["input"]} />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="cardNumber" className={styles["label"]}>
          Kortnummer:
        </label>
        <input type="text" id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} className={styles["input"]} />
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
