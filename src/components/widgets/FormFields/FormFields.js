import React from "react";
import styles from "./FormFields.module.css";

const FormFields = ({ formData, handleChange, id }) => {
  const renderTemplate = () => {
    let formTemplate = null;

    const showError = () => {
      let errorMessage = null;

      if (formData.validation && !formData.valid) {
        errorMessage = (
          <div className={styles.LabelError}>{formData.validationMessage}</div>
        );
      }

      return errorMessage;
    };

    switch (formData.element) {
      case "input":
        formTemplate = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event => handleChange({ event, id, blur: true })}
              onChange={event => handleChange({ event, id, blur: false })}
            />
            {showError()}
          </div>
        );
        break;

      case "select":
        formTemplate = (
          <div>
            <select
              value={formData.value}
              name={formData.config.name}
              onBlur={event => handleChange({ event, id, blur: true })}
              onChange={event => handleChange({ event, id, blur: false })}
            >
              {formData.config.options.map((team, i) => (
                <option value={team.id} key={i}>
                  {team.name}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormFields;
