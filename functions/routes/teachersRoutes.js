const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  setTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
} = require("../controller/teachersControllers");

router.get("/", protect, getTeachers);
router.post("/", protect, setTeacher);
router.put("/:id", protect, updateTeacher);
router.delete("/:id", protect, deleteTeacher);

module.exports = router;
