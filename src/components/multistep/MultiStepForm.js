import React, { useState } from "react";
import styles from "./MultiStepForm.module.css";

const MultistepForm = () => {
  const [currentStep, setCurrentStep] = useState(1); // Current step state
  const [steps, setSteps] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      zipcode: "",
      country: "",
      address: "",
      phone: "",
    },
  ]); // Initial form state

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
        country: "",
        address: "",
        phone: "",
      },
    ]);
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(steps);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.counter}>
        {currentStep}/{steps.length}
      </div>
      {steps.map((step, index) => {
        if (index === steps.length - 1) {
          return (
            <div className={styles.stepContainer} key={index}>
              <h2>Step {index + 1}</h2>
              <label className={styles.formLabel}>
                Navn:
                <input type="text" name="firstname" value={step.firstname} onChange={(event) => handleChange(index, event)} />
              </label>
              <br />
              <label className={styles.formLabel}>
                Efternavn: <input type="text" name="lastname" value={step.lastname} onChange={(event) => handleChange(index, event)} />{" "}
              </label>
              <hr />{" "}
              <label className={styles.formLabel}>
                Email: <input type="email" name="email" value={step.email} onChange={(event) => handleChange(index, event)} />{" "}
              </label>
              <hr />{" "}
              <label className={styles.formLabel}>
                PostNr: <input type="text" name="zipcode" value={step.zipcode} onChange={(event) => handleChange(index, event)} />{" "}
              </label>
              <hr />{" "}
              <label className={styles.formLabel}>
                Land: <input type="text" name="country" value={step.country} onChange={(event) => handleChange(index, event)} />{" "}
              </label>
              <hr />{" "}
              <label className={styles.formLabel}>
                Adresse: <input type="text" name="address" value={step.address} onChange={(event) => handleChange(index, event)} />{" "}
              </label>
              <hr />{" "}
              <label className={styles.formLabel}>
                Telefon nr.:
                <input type="phone" name="phone" value={step.phone} onChange={(event) => handleChange(index, event)} />
              </label>
              <button type="button" onClick={handleAddStep}>
                Tilføj Person
              </button>
              <button type="submit">Submit</button>
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
