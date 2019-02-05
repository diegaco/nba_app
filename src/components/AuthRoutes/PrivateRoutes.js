import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        component={props =>
          user ? <Comp user={user} {...props} /> : <Redirect to="/sign-in" />
        }
      />
    </div>
  );
};

export default PrivateRoutes;
