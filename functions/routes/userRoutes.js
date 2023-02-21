const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  updateUser,
  getUsers,
  updateRole,
} = require("../controller/userController");

router.get("/", protect, getUsers);
router.put("/:id", protect, updateUser);
router.post("/updateRole", protect, updateRole);

module.exports = router;
