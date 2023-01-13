import { lazy } from "react";

const ClassroomsList = lazy(() => import("./ClassroomsList"));
const AppySlot = lazy(() => import("./ApplySlot"));
const AssignStudents = lazy(() => import("./AssignStudents"));
const ViewAssignedStudents = lazy(() => import("./ViewAssignedStudents"));
const AssignNew = lazy(() => import("./AssignNew"));

const classroomsRoutes = [
  {
    path: "/classrooms/classrooms-list",
    component: ClassroomsList,
  },

  {
    path: "/classrooms/applyslot/:id",
    component: AppySlot,
  },
  {
    path: "/classrooms/classrooms-assign",
    component: AssignStudents,
  },
  {
    path: "/classrooms/assignStudents/list/:id",
    component: ViewAssignedStudents,
  },

  {
    path: "/classrooms/assignStudents/:id",
    component: AssignNew,
  },
];

export default classroomsRoutes;
