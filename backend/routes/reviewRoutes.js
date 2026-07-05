const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", createReview);

router.get("/", getReviews);

router.get("/:id", getReviewById);

router.put("/:id",protect, updateReview);

router.delete("/:id",protect,admin, deleteReview);

module.exports = router;