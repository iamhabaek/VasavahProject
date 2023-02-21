import { lazy } from "react";

const Signin = lazy(() => import("./Signin"));

const ForgotPassword = lazy(() => import("./ForgotPassword"));

const Error404 = lazy(() => import("./Error"));

const sessionsRoutes = [
  {
    path: "/session/signin",
    component: Signin,
  },
  {
    path: "/session/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/session/404",
    component: Error404,
  },
];

export default sessionsRoutes;
