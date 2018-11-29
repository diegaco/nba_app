import React from "react";
import styles from "./Button.module.css";

const Button = props => {
  let template = null;

  switch (props.type) {
    case "loadmore":
      template = (
        <button className={styles.btnPrimary} onClick={props.loadMore}>
          {props.labelText}
        </button>
      );
      break;
    default:
      template = null;
  }
  return template;
};

export default Button;
