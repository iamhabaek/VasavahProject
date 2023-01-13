import { lazy } from "react";

const AddStudentForm = lazy(() => import("./AddStudentForm"));
const StudentsList = lazy(() => import("./StudentsList"));
const EditStudent = lazy(() => import("./EditStudent"));

const studentsRoutes = [
  {
    path: "/students/add-student",
    component: AddStudentForm,
  },
  {
    path: "/students/studentslist",
    component: StudentsList,
  },
  {
    path: "/students/edit/:id",
    component: EditStudent,
  },
];

export default studentsRoutes;
