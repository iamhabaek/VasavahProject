import { lazy } from "react";

const GenerateReport = lazy(() => import("./GenerateReport"));
const ExcelReport = lazy(() => import("./ExcelReport"));
const reportsRoutes = [
  {
    path: "/reports/genereate-report/:id",
    component: GenerateReport,
  },
  {
    path: "/reports/genereate-excel/:id",
    component: ExcelReport,
  },
];

export default reportsRoutes;
