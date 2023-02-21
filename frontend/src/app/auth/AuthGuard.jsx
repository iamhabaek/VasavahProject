import React, { useState, useEffect, useContext, Fragment } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import AppContext from "app/appContext";
import GullLayout from "app/GullLayout/GullLayout";
import { flatMap } from "lodash";

const AuthGuard = ({ route }) => {
  const { routes, user } = useContext(AppContext);
  const [authenticated, setAuthenticated] = useState(true);
  const [routesState, setRoutesState] = useState(routes);
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;

  useEffect(() => {
    setRoutesState(
      flatMap(routesState, (item) => {
        if (item.routes) {
          return [...item.routes];
        }
        return [item];
      })
    );
  }, []);
  useEffect(() => {
    const matched = routesState.find((r) => r.path === pathname);
    const authenticated =
      matched && matched.auth && matched.auth.length
        ? matched.auth.includes(user && user.role)
        : true;
    setAuthenticated(authenticated);
    if (!authenticated) {
      redirectRoute();
    }
  }, [routesState, pathname]);

  function redirectRoute() {
    history.push({
      pathname: "/session/signin",
      state: { redirectUrl: pathname },
    });
  }
  return authenticated ? (
    <Fragment>
      <GullLayout route={route}></GullLayout>
    </Fragment>
  ) : null;
};

export default AuthGuard;
