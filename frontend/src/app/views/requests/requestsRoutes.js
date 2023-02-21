import { lazy } from "react";

const CloseScheduleList = lazy(() => import("./CloseScheduleList"));
const SwapScheduleList = lazy(() => import("./SwapScheduleList"));
const SwapSchedule = lazy(() => import("./SwapSchedule"));
const CloseSchedule = lazy(() => import("./CloseSchedule"));

const requestsRoutes = [
  {
    path: "/requests/close-schedule-list",
    component: CloseScheduleList,
  },
  {
    path: "/requests/swap-schedule-list",
    component: SwapScheduleList,
  },
  {
    path: "/requests/close-schedule/:id",
    component: CloseSchedule,
  },
  {
    path: "/requests/swap-schedule/:id",
    component: SwapSchedule,
  },
];

export default requestsRoutes;
