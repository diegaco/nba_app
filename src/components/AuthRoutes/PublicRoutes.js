import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        component={props =>
          rest.restricted ? (
            user ? (
              <Redirect to="/dashboard" />
            ) : (
              <Comp user={user} {...props} />
            )
          ) : (
            <Comp user={user} {...props} />
          )
        }
      />
    </div>
  );
};

export default PublicRoutes;
