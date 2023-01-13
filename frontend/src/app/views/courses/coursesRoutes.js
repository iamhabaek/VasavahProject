import { lazy } from "react";

const AddCourse = lazy(() => import("./AddCourse"));
const CoursesList = lazy(() => import("./CoursesList"));
const EditCourse = lazy(() => import("./EditCourse"));

const coursesRoutes = [
  {
    path: "/courses/add-course",
    component: AddCourse,
  },
  {
    path: "/courses/courses-list",
    component: CoursesList,
  },
  {
    path: "/courses/edit/:id",
    component: EditCourse,
  },
];

export default coursesRoutes;
