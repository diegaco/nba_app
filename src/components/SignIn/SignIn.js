import React, { Component } from "react";
import FormField from "../widgets/FormFields";
import styles from "./SignIn.module.css";

class SignIn extends Component {
  state = {
    registerError: "",
    loading: false,
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  handleFormChange = element => {
    const newFormData = {
      ...this.state.formData
    };

    const newElement = {
      ...newFormData[element.id]
    };

    newElement.value = element.event.target.value;

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({
      formData: newFormData
    });
  };

  validate = element => {
    let error = [true, ""];

    // validate email
    if (element.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(element.value);
      const msg = `${!valid ? "Must enter a valid email" : ""}`;
      error = !valid ? [valid, msg] : error;
    }

    // validate password
    if (element.validation.password) {
      const valid = element.value.length >= 5;
      const msg = `${!valid ? "Must be greater than 5" : ""}`;
      error = !valid ? [valid, msg] : error;
    }

    // validate required
    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const msg = `${!valid ? "This field is required" : ""}`;
      error = !valid ? [valid, msg] : error;
    }
    return error;
  };

  submitButton = () =>
    this.state.loading ? (
      "loading..."
    ) : (
      <div>
        <button onClick={event => this.submitForm(event, false)}>
          Register Now
        </button>
        <button onClick={event => this.submitForm(event, true)}>Log in</button>
      </div>
    );

  submitForm = (event, type) => {
    event.preventDefault();
    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
      }

      for (let key in this.state.formData) {
        formIsValid = this.state.formData[key].valid && formIsValid;
      }

      if (formIsValid) {
        this.setState({
          loading: true,
          registerError: ""
        });

        if (type) {
          console.log("Login");
        } else {
          console.log("Register Now");
        }
      }
    }
  };

  render() {
    return (
      <div className={styles.LoginContainer}>
        <form action="" onSubmit={event => this.submitForm(event, null)}>
          <h2>Register / Log In</h2>
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            handleChange={element => this.handleFormChange(element)}
          />

          <FormField
            id={"password"}
            formData={this.state.formData.password}
            handleChange={element => this.handleFormChange(element)}
          />

          {this.submitButton()}
        </form>
      </div>
    );
  }
}

export default SignIn;
