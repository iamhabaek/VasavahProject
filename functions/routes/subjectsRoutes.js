const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  setSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} = require("../controller/subjectsController");

router.get("/", protect, getSubjects);
router.post("/", protect, setSubject);
router.put("/:id", protect, updateSubject);
router.delete("/:id", protect, deleteSubject);

module.exports = router;
