const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  setCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controller/coursesController");

router.get("/", protect, getCourses);
router.post("/", protect, setCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

module.exports = router;
