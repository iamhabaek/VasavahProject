import React, { Fragment, useContext } from "react";
import AppContext from "app/appContext";
import GullLayout from "app/GullLayout/GullLayout";
import { Redirect } from "react-router-dom";

const AuthGuard = ({ route }) => {
  const { user } = useContext(AppContext);
  return (
    <Fragment>
      {user ? (
        <GullLayout route={route}></GullLayout>
      ) : (
        <Redirect to="/session/signin" />
      )}
    </Fragment>
  );
};

export default AuthGuard;
