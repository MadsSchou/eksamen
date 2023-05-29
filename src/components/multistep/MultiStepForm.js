import React, { useState, useContext } from "react";
import styles from "./MultiStepForm.module.css";
import { DispatchContext, StoreContext } from "@/context/ticketContext";
import { useRouter } from "next/router";
import Timer from "../Timer/timer";

const MultistepForm = () => {
  const state = useContext(StoreContext);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const dispatch = useContext(DispatchContext);
  const [city, setCity] = useState("");
  const [steps, setSteps] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      zipcode: "",
      city: "",
      country: "Danmark",
      address: "",
      phone: "",
    },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [name]: value };
    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        firstname: "",
        lastname: "",
        email: "",
        zipcode: "",
        city: "",
        country: "Danmark",
        address: "",
        phone: "",
      },
    ]);
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      action: "ADD_PEOPLE",
      payload: steps,
    });

    router.push("/Checkout");
  };

  const totalSteps = state.basicTicket + state.vipTicket;

  function handleZipCode(e) {
    console.log(e);
    if (e.length === 4) {
      console.log("heeeey");

      fetch("https://api.dataforsyningen.dk/postnumre")
        .then((res) => res.json())
        .then((data) => {
          const findZip = data?.find((zip) => parseInt(zip.nr) === parseInt(e));

          setCity(findZip.navn);
        });
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.counter}>
        {currentStep}/{totalSteps}
      </div>
      {steps.map((step, index) => {
        if (index === steps.length - 1) {
          return (
            <div className={styles.stepContainer} key={index}>
              <h2>Person {index + 1}</h2>
              <label className={styles.formLabel}>
                Navn:
                <input
                  type="text"
                  name="firstname"
                  defaultValue={step.firstname}
                  onBlur={(event) => handleChange(index, event)}
                />
              </label>

              <label className={styles.formLabel}>
                Efternavn:{" "}
                <input
                  type="text"
                  name="lastname"
                  value={step.lastname}
                  onBlur={(event) => handleChange(index, event)}
                />
              </label>
              <label className={styles.formLabel}>
                Email:{" "}
                <input
                  type="email"
                  name="email"
                  value={step.email}
                  onBlur={(event) => handleChange(index, event)}
                />
              </label>
              <label className={styles.formLabel}>
                Telefon nr.:
                <input
                  type="phone"
                  name="phone"
                  value={step.phone}
                  onBlur={(event) => handleChange(index, event)}
                />
              </label>

              <label className={styles.formLabel}>
                Adresse:{" "}
                <input
                  type="text"
                  name="address"
                  value={step.address}
                  onBlur={(event) => handleChange(index, event)}
                />
              </label>
              <label className={styles.formLabel}>
                PostNr:
                <input
                  type="number"
                  name="zipcode"
                  onChange={(e) => handleZipCode(e.target.value)}
                  onBlur={(event) => handleChange(index, event)}
                />
              </label>
              <label className={styles.formLabel}>
                City:
                <input
                  defaultValue={city}
                  type="text"
                  name="city"
                  onBlur={(event) => handleChange(index, event)}
                />
              </label>

              <label className={styles.formLabel}>
                Land:{" "}
                <input
                  type="text"
                  name="country"
                  defaultValue={step.country}
                  onBlur={(event) => handleChange(index, event)}
                />
              </label>

              {totalSteps === steps.length ? (
                <button onClick={handleSubmit}>Gå Til Betaling</button>
              ) : (
                <button type="button" onClick={handleAddStep}>
                  Næste
                </button>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </form>
  );
};

export default MultistepForm;
