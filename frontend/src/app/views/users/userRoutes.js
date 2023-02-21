import { lazy } from "react";

const ViewProfile = lazy(() => import("./ViewProfile"));
const UsersList = lazy(() => import("./UsersList"));
const userRoutes = [
  {
    path: "/user/profile/:id",
    component: ViewProfile,
  },

  {
    path: "/user/users-list",
    component: UsersList,
  },
];

export default userRoutes;
