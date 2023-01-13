import { lazy } from "react";

const OccupiedSlotsList = lazy(() => import("./OccupiedSlotsList"));
const SwapSLot = lazy(() => import("./SwapSlot"));
const EditClassroomSlot = lazy(() => import("./EditClassroomSlot"));
const masterClassRoutes = [
  {
    path: "/masterClass/list",
    component: OccupiedSlotsList,
  },
  {
    path: "/masterClass/swap/:id",
    component: SwapSLot,
  },
  {
    path: "/masterClass/edit/:id",
    component: EditClassroomSlot,
  },
];

export default masterClassRoutes;
