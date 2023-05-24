import React, { useState, useEffect, useContext } from "react";
import { DispatchContext, StoreContext } from "@/context/ticketContext";
import Head from "next/head";
import styles from "./CampgroundForm.module.css";
import Ordreoversigt from "../components/ordreoversigt/ordreoversigt";
import Flow from "@/components/steps";

export default function Home({ data }) {
  const [areaData, setAreaData] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [availableAmount, setAvailableAmount] = useState(0);
  const [greenCamping, setGreenCamping] = useState(false);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    fetchArea();
  }, []);

  const fetchArea = () => {
    fetch("http://localhost:8080/available-spots")
      .then((res) => res.json())
      .then((data) => {
        setAreaData(data);
        console.log(data);
      });
  };

  const addToBasket = (key) => {
    dispatch({
      action: "ADD_TO_BASKET",
      payload: {
        key: key,
      },
    });

    // if (greenCamping) {
    //   dispatch({
    //     action: "ADD_TO_BASKET",
    //     payload: {
    //       key: "greenCamping",
    //     },
    //   });
    // }
  };

  const handleAreaChange = (event) => {
    const selectedArea = event.target.value;
    setSelectedArea(selectedArea);

    if (selectedArea) {
      const selectedSpot = areaData.find((area) => area.area === selectedArea);
      if (selectedSpot) {
        setAvailableAmount(selectedSpot.available);
      }
    } else {
      setAvailableAmount(0);
    }
  };

  return (
    <>
      <Head>
        <title>Thunderstrike Metal Festival</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flow step={1} />

      <div className={styles.container}>
        <div className={styles.column}>
          <h2>Vælg det område du/i ønsker at bo i</h2>
          <br></br>
          <div className={styles.dropDown}>
            <select id="areaSelect" value={selectedArea} onChange={handleAreaChange}>
              <option value="">Vælg et område</option>
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
          <p>Ved at købe en billet til vores festival har du mulighed for at gøre endnu mere for den grønne omstilling! Udover at nyde fantastisk musik og en uforglemmelig oplevelse, kan du vælge at støtte vores grønne initiativer ved at tilføje et ekstra beløb til din billet.</p>
          <br></br>
          <p>249,-</p>
          <br></br>
          <input type="checkbox" onChange={() => setGreenCamping(!greenCamping)} />
        </div>
        <div className={styles.column}>
          <Ordreoversigt />

          <div className={styles.centerButton}>
            {/* <Link href="/personalinfo"> */}
            <button onClick={() => addToBasket("area")}>Reserver</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
