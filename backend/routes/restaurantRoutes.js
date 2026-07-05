const express = require("express");
const router = express.Router();

const { addRestaurant,getAllRestaurants,updateRestaurant,deleteRestaurant, } = require("../controllers/restaurantController");
const { protect, admin } = require("../middleware/authMiddleware");
// Add Restaurant
router.post("/", protect,admin, addRestaurant);
router.get("/", getAllRestaurants);
router.put("/:id", protect,admin, updateRestaurant);
router.delete("/:id", protect,admin, deleteRestaurant);
module.exports = router;