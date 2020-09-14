import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAutenticated } from "./Autentication";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutenticated() ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
