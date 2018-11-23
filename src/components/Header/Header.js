import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import SideNav from "./SideNavigation";
import style from "./Header.module.css";

const Header = props => {
  const logo = () => (
    <Link to="/" className={style.logo}>
      <img alt="NBA App" src="/images/nba_logo.png" />
    </Link>
  );

  const navBars = () => (
    <div className={style.bars}>
      <FontAwesome
        onClick={props.onOpenNav}
        name="bars"
        style={{ color: "#dfdfdf", padding: "10px", cursor: "pointer" }}
      />
    </div>
  );

  return (
    <header className={style.header}>
      <SideNav {...props} />
      <div className={style.headerOpt}>
        {navBars()}
        {logo()}
      </div>
    </header>
  );
};

export default Header;
