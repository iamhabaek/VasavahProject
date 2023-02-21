const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getRequests,
  setRequest,
  updateRequest,
  deleteRequest,
} = require("../controller/requestsController");

router.get("/", protect, getRequests);
router.post("/", protect, setRequest);
router.put("/:id", protect, updateRequest);
router.delete("/:id", protect, deleteRequest);

module.exports = router;
