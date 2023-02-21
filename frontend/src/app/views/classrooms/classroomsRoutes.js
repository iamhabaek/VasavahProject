import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";
const MyClasses = lazy(() => import("./MyClasses"));
const ViewAssignedStudents = lazy(() => import("./ViewAssignedStudents"));
const AssignNew = lazy(() => import("./AssignNew"));
const ScheduleList = lazy(() => import("./ScheduleList"));

const classroomsRoutes = [
  {
    path: "/classrooms/my-classes/",
    component: MyClasses,
    auth: authRoles.teacher,
  },
  {
    path: "/classrooms/assignStudents/list/:id",
    component: ViewAssignedStudents,
    auth: authRoles.teacher,
  },

  {
    path: "/classrooms/assignStudents/:id",
    component: AssignNew,
    auth: authRoles.teacher,
  },
  {
    path: "/classrooms/schedule",
    component: ScheduleList,
    auth: authRoles.teacher,
  },
];

export default classroomsRoutes;
