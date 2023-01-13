const express = require("express");
const router = express.Router();

const {
  setTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
} = require("../controller/teachersControllers");

router.get("/", getTeachers);
router.post("/", setTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
