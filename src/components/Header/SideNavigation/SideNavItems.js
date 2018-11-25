import React from "react";
import { Link } from "react-router-dom";

import FontAwesome from "react-fontawesome";
import style from "./SideNav.module.css";

const SideNavItems = () => {
  const items = [
    {
      type: style.navItem,
      icon: "home",
      text: "Home",
      link: "/"
    },
    {
      type: style.navItem,
      icon: "file-text-o",
      text: "News",
      link: "/news"
    },
    {
      type: style.navItem,
      icon: "play",
      text: "Videos",
      link: "/videos"
    },
    {
      type: style.navItem,
      icon: "sign-in",
      text: "Sign In",
      link: "/sign-in"
    },
    {
      type: style.navItem,
      icon: "sign-out",
      text: "Sign Out",
      link: "/sign-out"
    }
  ];

  const showNavItems = () =>
    items.map(item => (
      <li className={item.type} key={item.text}>
        <Link to={item.link}>
          <FontAwesome name={item.icon} />
          {item.text}
        </Link>
      </li>
    ));

  return (
    <React.Fragment>
      <ul className="list-unstyled">{showNavItems()}</ul>
    </React.Fragment>
  );
};

export default SideNavItems;
