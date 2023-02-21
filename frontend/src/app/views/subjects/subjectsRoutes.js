import { lazy } from "react";

const AddSubjects = lazy(() => import("./AddSubject"));
const SubjectsLists = lazy(() => import("./SubjectsLists"));
const EditSubject = lazy(() => import("./EditSubjects"));
const SubjectsReport = lazy(() => import("./SubjectsReport"));

const subjectsRoutes = [
  {
    path: "/subjects/add-subject",
    component: AddSubjects,
  },
  {
    path: "/subjects/subjects-list",
    component: SubjectsLists,
  },
  {
    path: "/subjects/report",
    component: SubjectsReport,
  },
  {
    path: "/subjects/edit/:id",
    component: EditSubject,
  },
];

export default subjectsRoutes;
