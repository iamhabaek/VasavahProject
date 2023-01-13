import { lazy } from "react";

const AddTeacher = lazy(() => import("./AddTeacher"));
const TeachersList = lazy(() => import("./TeachersList"));
const EditTeacher = lazy(() => import("./EditTeacher"));

const teachersRoutes = [
  {
    path: "/teachers/add-teacher",
    component: AddTeacher,
  },
  {
    path: "/teachers/teachersList",
    component: TeachersList,
  },
  {
    path: "/teachers/edit/:id",
    component: EditTeacher,
  },
];

export default teachersRoutes;
