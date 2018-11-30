import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = props => {
  let template = null;

  switch (props.type) {
    case "loadmore":
      template = (
        <button className={styles.btnPrimary} onClick={props.loadMore}>
          {props.cta}
        </button>
      );
      break;
    case "linkTo":
      template = (
        <Link to={props.linkTo} className={styles.btnPrimary}>
          {props.cta}
        </Link>
      );
      break;
    default:
      template = null;
  }
  return template;
};

export default Button;
