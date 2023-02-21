import React, { Suspense, useContext } from "react";
import { renderRoutes } from "react-router-config";
import Layout1Sidenav from "./Layout1Sidenav";
import Layout1Header from "./Layout1Header";
import { classList } from "@utils";
import AppContext from "app/appContext";
import Loading from "@gull/components/GullLoadable/Loading";

const Layout1 = ({ routes }) => {
  const { user } = useContext(AppContext);
  return (
    <div>
      <div className={`app-admin-wrap layout-sidebar-large`}>
        <Layout1Header></Layout1Header>
        {user && <Layout1Sidenav user={user} />}
        {/* sidebar */}

        <div
          className={classList({
            "main-content-wrap d-flex flex-column": true,
            "sidenav-open": true,
          })}
        >
          <Suspense fallback={<Loading />}>
            <div className="main-content">{renderRoutes(routes)}</div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default Layout1;
