const Reservation = require("../models/reservation");
const Table = require("../models/table");

// Book a Table
const bookTable = async (req, res) => {
  try {
    const { 
      user,
      restaurant,
      table,
      reservationDate,
      reservationTime,
      numberOfGuests,
      
    
    } = req.body;

    // Check if table exists
    const existingTable = await Table.findById(table);

    if (!existingTable) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    // Check availability
    if (!existingTable.isAvailable) {
      return res.status(400).json({
        message: "Table is already booked",
      });
    }
    // Check table capacity
if (numberOfGuests > existingTable.capacity) {
  return res.status(400).json({
    message: "Table capacity is not enough for the requested guests",
  });
}

    // Create reservation
    const reservation = await
    Reservation.create({
      user,
      restaurant,
      table,
      reservationDate,
      reservationTime,
      numberOfGuests,
      status: req.body.status,
    });

    // Mark table as unavailable
    existingTable.isAvailable = false;
    await existingTable.save();

    res.status(201).json({
      message: "Table booked successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user")
      .populate("restaurant")
      .populate("table");

    res.status(200).json(reservations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Reservation By ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("user")
      .populate("restaurant")
      .populate("table");

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.status(200).json(reservation);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Reservation
const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.status(200).json({
      message: "Reservation updated successfully",
      reservation,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Reservation
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    // Make table available again
    const table = await Table.findById(reservation.table);

    if (table) {
      table.isAvailable = true;
      await table.save();
    }

    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Reservation cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookTable,
  getReservations,
  getReservationById,
  updateReservation,
  cancelReservation,
};
