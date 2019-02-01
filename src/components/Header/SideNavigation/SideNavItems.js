import React from "react";
import { Link, withRouter } from "react-router-dom";
import { firebase } from "../../../firebase";
import FontAwesome from "react-fontawesome";
import style from "./SideNav.module.css";

const SideNavItems = props => {
  const items = [
    {
      type: style.navItem,
      icon: "home",
      text: "Home",
      link: "/",
      login: ""
    },
    {
      type: style.navItem,
      icon: "file-text-o",
      text: "News",
      link: "/news",
      login: ""
    },
    {
      type: style.navItem,
      icon: "play",
      text: "Videos",
      link: "/videos",
      login: ""
    },
    {
      type: style.navItem,
      icon: "dashboard",
      text: "Dashboard",
      link: "/dashboard",
      login: false
    },
    {
      type: style.navItem,
      icon: "sign-in",
      text: "Sign In",
      link: "/sign-in",
      login: true
    },
    {
      type: style.navItem,
      icon: "sign-out",
      text: "Sign Out",
      link: "/sign-out",
      login: false
    }
  ];

  const commonNavItems = (item, i) => (
    <li className={item.type} key={i}>
      <Link to={item.link}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </li>
  );

  const restrictedNavItems = (item, i) => {
    let template = null;

    if (props.user === null && item.login) {
      template = commonNavItems(item, i);
    }

    if (props.user !== null && !item.login) {
      if (item.link === "/sign-out") {
        template = (
          <li
            className={item.type}
            key={i}
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  props.history.push("/");
                });
            }}
          >
            <FontAwesome name={item.icon} />
            {item.text}
          </li>
        );
      } else {
        template = commonNavItems(item, i);
      }
    }
    return template;
  };

  const showNavItems = () => {
    return items.map((item, i) => {
      return item.login !== ""
        ? restrictedNavItems(item, i)
        : commonNavItems(item, i);
    });
  };

  return (
    <React.Fragment>
      <ul className="list-unstyled">{showNavItems()}</ul>
    </React.Fragment>
  );
};

export default withRouter(SideNavItems);
