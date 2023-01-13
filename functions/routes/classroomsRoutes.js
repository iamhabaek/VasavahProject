const express = require("express");
const router = express.Router();

const {
  setClassroom,
  getClassrooms,
  updateClassroom,
  applySlot,
  deleteClassroom,
} = require("../controller/classroomsController");

router.get("/", getClassrooms);
router.post("/", setClassroom);
router.put("/apply/:id", applySlot);
router.put("/:id", updateClassroom);
router.delete("/:id", deleteClassroom);

module.exports = router;
