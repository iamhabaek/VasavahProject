import { lazy } from "react";

const OccupiedSlotsList = lazy(() => import("./OccupiedSlotsList"));
const SwapSLot = lazy(() => import("./SwapSlot"));
const masterClassRoutes = [
  {
    path: "/masterClass/list",
    component: OccupiedSlotsList,
  },
  {
    path: "/masterClass/swap/:id",
    component: SwapSLot,
  },
];

export default masterClassRoutes;
