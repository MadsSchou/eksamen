import React, { useState, useEffect, useContext } from "react";
import { DispatchContext, StoreContext } from "@/context/ticketContext";
import Head from "next/head";
import styles from "./CampgroundForm.module.css";
import Ordreoversigt from "@/components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";
import { Checkbox } from "antd";
import Link from "next/link";

export default function Home({ data }) {
  const [areaData, setAreaData] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [availableAmount, setAvailableAmount] = useState(0);
  const [greenCamping, setGreenCamping] = useState(false);
  const dispatch = useContext(DispatchContext);
  // Disabler reserver knappen, hvis antallet af pladser er 0
  const isButtonDisabled = !selectedArea || availableAmount === 0;
  // Error besked, hvis der ikke er flere pladser i det valgte område
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchArea();
  }, []);

  const fetchArea = () => {
    fetch("https://charm-pale-tub.glitch.me/available-spots")
      .then((res) => res.json())
      .then((data) => {
        setAreaData(data);
        console.log(data);
      });
  };

  const addToBasket = () => {
    dispatch({
      action: "SET_AREA",
      payload: {
        area: selectedArea,
        greenCamping,
      },
    });
  };

  // fetch("https://charm-pale-tub.glitch.me/reserve-spot", {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(payload),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const reservationId = data.id;
  //     console.log("Reservation id:", reservationId);
  //   });

  const handleAreaChange = (event) => {
    const selectedArea = event.target.value;
    setSelectedArea(selectedArea);

    if (selectedArea) {
      const selectedSpot = areaData.find((area) => area.area === selectedArea);
      if (selectedSpot) {
        setAvailableAmount(selectedSpot.available);
        if (selectedSpot.available === 0) {
          setErrorMessage("Der er ikke flere pladser i det valgte område");
        } else {
          setErrorMessage("");
        }
      }
    } else {
      setAvailableAmount(0);
      setErrorMessage("");
    }
  };

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.flow}>
        <Flow step={1} />
      </div>

      <div className={styles.container}>
        <div className={styles.column}>
          <h2>Vælg det område du/i ønsker at bo i</h2>
          <br></br>
          <div>
            <select
              className={styles.dropDown}
              id="areaSelect"
              value={selectedArea}
              onChange={handleAreaChange}
            >
              <option>Vælg et område</option>
              {areaData &&
                areaData.map((area) => (
                  <option key={area.area} value={area.area}>
                    {area.area}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <br></br>
            {selectedArea && (
              <p>
                <b>
                  Der er {availableAmount} ledige pladser i {selectedArea}
                </b>
              </p>
            )}
          </div>
          <br></br>

          <h2>Vil du være med til at støtte den grønne omstilling? </h2>
          <br></br>
          <p clasName={styles.greenPrice}>249,-</p>
          <br></br>
          <p>
            Ved at købe en billet til vores festival har du mulighed for at gøre
            endnu mere for den grønne omstilling! Udover at nyde fantastisk
            musik og en uforglemmelig oplevelse, kan du vælge at støtte vores
            grønne initiativer ved at tilføje et ekstra beløb til din billet.
          </p>
          <br></br>
          <br></br>
          <label>
            <Checkbox
              className={styles.checkbox}
              onChange={() => setGreenCamping(!greenCamping)}
            />{" "}
            <b>Tilføj Grøn Camping</b>
          </label>
        </div>

        <div className={styles.ordreWeb}>
          <Ordreoversigt />

          <div className={styles.column}>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <br></br>
            <div className={styles.centerButton}>
              <Link href="/personalinfo">
                <button onClick={addToBasket} disabled={isButtonDisabled}>
                  Reserver
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
