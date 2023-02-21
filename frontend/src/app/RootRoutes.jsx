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
import dashboardRoutes from "./views/dashboard/dashboardRoutes";
import userRoutes from "./views/users/userRoutes";
import requestsRoutes from "./views/requests/requestsRoutes";
import approvalRoutes from "./views/approvals/approvalRoutes";
import { authRoles } from "./auth/authRoles";
const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/classrooms/schedule" />,
    auth: authRoles.teacher,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
    auth: authRoles.admin,
  },
];

const routes = [
  ...sessionsRoutes,
  {
    path: "/",
    component: AuthGuard,
    routes: [
      ...userRoutes,
      ...classroomsRoutes,
      ...studentsRoutes,
      ...teachersRoutes,
      ...subjectsRoutes,
      ...coursesRoutes,
      ...reportsRoutes,
      ...masterClassRoutes,
      ...manageClassroomsRoutes,
      ...dashboardRoutes,
      ...requestsRoutes,
      ...approvalRoutes,
      ...redirectRoute,
      ...errorRoute,
    ],
  },
];

export default routes;
