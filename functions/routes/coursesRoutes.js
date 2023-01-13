const express = require("express");
const router = express.Router();

const {
  setCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controller/coursesController");

router.get("/", getCourses);
router.post("/", setCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
