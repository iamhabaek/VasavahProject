const express = require("express");
const router = express.Router();

const {
  setClassroomSlots,
  getClassroomSlots,
  updateTimeSlots,
  swapSlots,
  deleteClassroomSlots,
  updateClassroomSlot,
} = require("../controller/classroomSlotsController");

router.get("/", getClassroomSlots);
router.post("/", setClassroomSlots);
router.put("/timeSlot/:id", updateTimeSlots);
router.put("/:id", updateClassroomSlot);
router.put("/", swapSlots);
router.delete("/:id", deleteClassroomSlots);

module.exports = router;
