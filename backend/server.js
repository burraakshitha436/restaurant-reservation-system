const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const tableRoutes = require("./routes/tableRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/reviews",reviewRoutes);
app.get("/", (req, res) => {
    res.send("Restaurant Reservation API is Running");
});

const PORT = process.env.PORT || 5000;

// ✅ start server only after DB connects
connectDB()
  .then(() => {
    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed:", err.message);
  });