const express = require("express");
const router = express.Router();

const {
  setStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controller/studentsController");

router.get("/", getStudents);
router.post("/", setStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
