import React from "react";
import SideNav from "react-simple-sidenav";

const SideNavigation = props => {
  return (
    <SideNav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        backgroundColor: "#242424",
        maxWidth: "220px"
      }}
    >
      <div>Home</div>
      <div>News</div>
    </SideNav>
  );
};

export default SideNavigation;
