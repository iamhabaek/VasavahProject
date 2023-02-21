import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";
const AddTeacher = lazy(() => import("./AddTeacher"));
const TeachersList = lazy(() => import("./TeachersList"));
const EditTeacher = lazy(() => import("./EditTeacher"));
const TeachersReport = lazy(() => import("./TeachersReport"));

const teachersRoutes = [
  {
    path: "/teachers/add-teacher",
    component: AddTeacher,
    auth: authRoles.admin,
  },
  {
    path: "/teachers/teachersList",
    component: TeachersList,
    auth: authRoles.admin,
  },
  {
    path: "/teachers/edit/:id",
    component: EditTeacher,
    auth: authRoles.admin,
  },
  {
    path: "/teachers/report",
    component: TeachersReport,
    auth: authRoles.admin,
  },
];

export default teachersRoutes;
