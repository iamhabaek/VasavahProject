import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";

const Dashboard = lazy(() => import("./Dashboard"));

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    auth: authRoles.admin,
  },
];

export default dashboardRoutes;
