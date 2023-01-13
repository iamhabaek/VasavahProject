import React from "react";
import { Redirect } from "react-router-dom";
import sessionsRoutes from "./views/sessions/sessionsRoutes";
import AuthGuard from "./auth/AuthGuard";
import studentsRoutes from "./views/students/studentsRoutes";
import teachersRoutes from "./views/teachers/teachersRoutes";
import subjectsRoutes from "./views/subjects/subjectsRoutes";
import classroomsRoutes from "./views/classrooms/classroomsRoutes";
import coursesRoutes from "./views/courses/coursesRoutes";
import reportsRoutes from "./views/reports/reportsRoutes";
import masterClassRoutes from "./views/masterClass/masterClassRoutes";
import manageClassroomsRoutes from "./views/manageClassrooms/manageClassroomsRoutes";
const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/classrooms/classrooms-list" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...sessionsRoutes,
  {
    path: "/",
    component: AuthGuard,
    routes: [
      ...classroomsRoutes,
      ...studentsRoutes,
      ...teachersRoutes,
      ...subjectsRoutes,
      ...coursesRoutes,
      ...reportsRoutes,
      ...masterClassRoutes,
      ...manageClassroomsRoutes,
      ...redirectRoute,
      ...errorRoute,
    ],
  },
];

export default routes;
