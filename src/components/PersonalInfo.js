import React, { useState } from "react";
import Link from "next/link";
import Basket from "./ordreoversigt/ordreoversigt";
import Head from "next/head";

const countries = ["USA", "Canada", "Mexico", "United Kingdom", "France", "Germany", "Spain", "Italy", "China", "Japan", "South Korea", "Australia", "New Zealand"];

const PersonalInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with form data, such as submitting it to a server
  };

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <form onSubmit={handleSubmit} style={{ width: "50%", padding: "20px", border: "1px solid #ccc" }}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="zipcode">Zipcode:</label>
            <input type="text" id="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="country">Country:</label>
            <select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" />
          </div>
          <div>
            <div>
              <Link href="/Checkout">
                <p>
                  <button type="submit">Submit</button>
                </p>
              </Link>
            </div>{" "}
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;
