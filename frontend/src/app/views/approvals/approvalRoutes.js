import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";
const CloseScheduleList = lazy(() => import("./CloseScheduleList"));
const SwapScheduleList = lazy(() => import("./SwapScheduleList"));
const SlotApplicationList = lazy(() => import("./SlotApplicationList"));
const approvalRoutes = [
  {
    path: "/classrooms/application-slot-list",
    component: SlotApplicationList,
    auth: authRoles.admin,
  },
  {
    path: "/classrooms/close-schedule-list",
    component: CloseScheduleList,
    auth: authRoles.admin,
  },
  {
    path: "/classrooms/swap-schedule-list",
    component: SwapScheduleList,
    auth: authRoles.admin,
  },
];

export default approvalRoutes;
