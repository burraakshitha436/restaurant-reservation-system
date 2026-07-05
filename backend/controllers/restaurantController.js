const Restaurant = require("../models/restaurant");

// Add Restaurant
const addRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, contact, totalTables } = req.body;

    const restaurant = await Restaurant.create({
      name,
      location,
      cuisine,
      contact,
      totalTables,
    });

    res.status(201).json({
      message: "Restaurant Added Successfully",
      restaurant,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      message: "Restaurants fetched successfully",
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Restaurant By ID
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Restaurant
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      message: "Restaurant Updated Successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      message: "Restaurant deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addRestaurant,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
};