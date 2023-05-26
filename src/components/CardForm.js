import { useState } from "react";
import styles from "./CardForm.module.css";
import { useRouter } from "next/router";

const CardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const router = useRouter();

  const handleCardNumberChange = (e) => {
    const input = e.target.value.slice(0, 16); // Limit to 16 characters
    setCardNumber(input);
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value.slice(0, 5); // Limit to 4 characters
    setExpiryDate(input);
  };

  const handleCVVChange = (e) => {
    const input = e.target.value.slice(0, 3); // Limit to 3 characters
    setCVV(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data (e.g., send it to a server)
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);

    // Clear the form fields
    setCardNumber("");
    setExpiryDate("");
    setCVV("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles["card-form"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="cardNumber" className={styles["label"]}>
          Card Number:
        </label>
        <input type="text" id="cardNumber" value={cardNumber} onChange={handleCardNumberChange} className={styles["input"]} />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="expiryDate" className={styles["label"]}>
          ExpiryDate Date/Year:
        </label>
        <input type="text" id="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} className={styles["input"]} />
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
        className={styles["submitButton"]} // Apply the submitButton class
      >
        Gennemfør køb
      </button>
    </form>
  );
};

export default CardForm;
