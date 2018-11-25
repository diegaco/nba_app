import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import { CURRENT_YEAR } from "../../config";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo}>
        <img alt="NBA App" src="/images/nba_logo.png" />
      </Link>
      <div className={styles.pullRight}>
        @NBA {CURRENT_YEAR} All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
