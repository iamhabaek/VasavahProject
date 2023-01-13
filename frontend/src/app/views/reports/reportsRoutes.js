import { lazy } from "react";

const GenerateReport = lazy(() => import("./GenerateReport"));

const reportsRoutes = [
  {
    path: "/reports/genereate-report/:id",
    component: GenerateReport,
  },
];

export default reportsRoutes;
