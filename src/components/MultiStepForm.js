import React, { useState } from "react";
import styles from "./MultiStepForm.module.css";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const clearFields = () => {
    setFormData({});
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.formStep}>
            <h2>Person 1</h2>
            <input type="text" name="field1" value={formData.field1 || ""} onChange={handleInputChange} placeholder="Firstname" />
            <input type="text" name="field2" value={formData.field2 || ""} onChange={handleInputChange} placeholder="Lastname" />
            <input type="text" name="field3" value={formData.field3 || ""} onChange={handleInputChange} placeholder="Mail" />
            <input type="text" name="field4" value={formData.field4 || ""} onChange={handleInputChange} placeholder="Address" />
            <input type="text" name="field5" value={formData.field5 || ""} onChange={handleInputChange} placeholder="PhoneNumber" />

            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className={styles.formStep}>
            <h2>Person 2</h2>
            <input type="text" name="field1" value={formData.field1 || ""} onChange={handleInputChange} placeholder="Firstname" />
            <input type="text" name="field2" value={formData.field2 || ""} onChange={handleInputChange} placeholder="Lastname" />
            <input type="text" name="field3" value={formData.field3 || ""} onChange={handleInputChange} placeholder="Mail" />
            <input type="text" name="field4" value={formData.field4 || ""} onChange={handleInputChange} placeholder="Address" />
            <input type="text" name="field5" value={formData.field5 || ""} onChange={handleInputChange} placeholder="PhoneNumber" />
            <button onClick={previousStep}>Previous</button>
            <button
              onClick={() => {
                clearFields();
                nextStep();
              }}
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className={styles.formStep}>
            <h2>Person 3</h2>
            <input type="text" name="field1" value={formData.field1 || ""} onChange={handleInputChange} placeholder="Firstname" />
            <input type="text" name="field2" value={formData.field2 || ""} onChange={handleInputChange} placeholder="Lastname" />
            <input type="text" name="field3" value={formData.field3 || ""} onChange={handleInputChange} placeholder="Mail" />
            <input type="text" name="field4" value={formData.field4 || ""} onChange={handleInputChange} placeholder="Address" />
            <input type="text" name="field5" value={formData.field5 || ""} onChange={handleInputChange} placeholder="PhoneNumber" />
            <button onClick={previousStep}>Previous</button>
            <button
              onClick={() => {
                clearFields();
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderFormStep()}</div>;
};

export default MultiStepForm;
