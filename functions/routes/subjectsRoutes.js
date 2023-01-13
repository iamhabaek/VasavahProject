const express = require("express");
const router = express.Router();

const {
  setSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} = require("../controller/subjectsController");

router.get("/", getSubjects);
router.post("/", setSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;
