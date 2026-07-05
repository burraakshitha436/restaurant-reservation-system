const express = require("express");
const router = express.Router();

const { bookTable,getReservations,getReservationById,updateReservation,cancelReservation, } = require("../controllers/reservationController");
const { protect, admin } = require("../middleware/authMiddleware");
// Book Table
router.post("/",  bookTable);
router.get("/", getReservations);
router.get("/:id", getReservationById);
router.put("/:id", updateReservation);
router.delete("/:id", cancelReservation);

module.exports = router;