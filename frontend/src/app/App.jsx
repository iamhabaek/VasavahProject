import "../fake-db";
import React, { Suspense } from "react";
import "../styles/app/app.scss";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { AppProvider } from "./appContext";
import history from "@history";
import { Store } from "./redux/Store";
import { renderRoutes } from "react-router-config";
import Auth from "./auth/Auth";
import RootRoutes from "./RootRoutes";
import { Loading } from "@gull";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <AppProvider>
      <Provider store={Store}>
        <Auth>
          <Suspense fallback={<Loading></Loading>}>
            <Router history={history}>{renderRoutes(RootRoutes)}</Router>
            <NotificationContainer />
          </Suspense>
        </Auth>
      </Provider>
    </AppProvider>
  );
}

export default App;
