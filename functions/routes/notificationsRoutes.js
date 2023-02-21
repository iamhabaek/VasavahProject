const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getNotifications,
  setNotification,
  updateNotification,
  deleteNotification,
} = require("../controller/notificationsController");

router.get("/", protect, getNotifications);
router.post("/", protect, setNotification);
router.put("/:id", protect, updateNotification);
router.delete("/:id", protect, deleteNotification);

module.exports = router;
