const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  setStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controller/studentsController");

router.get("/", protect, getStudents);
router.post("/", protect, setStudent);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;
