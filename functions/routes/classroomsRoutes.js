const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  setClassroom,
  getClassrooms,
  updateClassroom,
  deleteClassroom,
} = require("../controller/classroomsController");

router.get("/", protect, getClassrooms);
router.post("/", protect, setClassroom);
router.put("/:id", protect, updateClassroom);
router.delete("/:id", protect, deleteClassroom);

module.exports = router;
