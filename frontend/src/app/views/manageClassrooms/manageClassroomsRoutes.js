import { lazy } from "react";

const AddClassroom = lazy(() => import("./AddClassroom"));
const ClassroomsList = lazy(() => import("./ClassroomLists"));
const EditClassroom = lazy(() => import("./EditClassroom"));

const manageClassroomsRoutes = [
  {
    path: "/manage/add",
    component: AddClassroom,
  },
  {
    path: "/manage/list",
    component: ClassroomsList,
  },
  {
    path: "/manage/edit/:id",
    component: EditClassroom,
  },
];

export default manageClassroomsRoutes;
