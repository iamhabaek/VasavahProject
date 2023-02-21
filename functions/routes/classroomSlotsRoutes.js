const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  setClassroomSlots,
  getClassroomSlots,
  updateTimeSlots,
  swapSlots,
  deleteClassroomSlots,
  updateClassroomSlot,
  denySlot,
  approveSlot,
} = require("../controller/classroomSlotsController");

router.get("/", protect, getClassroomSlots);
router.post("/", protect, setClassroomSlots);
router.put("/timeSlot/:id", protect, updateTimeSlots);
router.put("/:id", protect, updateClassroomSlot);
router.put("/", protect, swapSlots);
router.delete("/deny/:id", protect, denySlot);
router.put("/approve/:id", protect, approveSlot);
router.delete("/:id", protect, deleteClassroomSlots);

module.exports = router;
