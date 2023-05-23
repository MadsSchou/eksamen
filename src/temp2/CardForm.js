import React, { useState } from "react";

const CardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card Number:
        <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
      </label>
      <label>
        Expiry Date:
        <input type="text" value={expiryDate} onChange={handleExpiryDateChange} />
      </label>
      <label>
        CVV:
        <input type="text" value={cvv} onChange={handleCvvChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CardForm;
