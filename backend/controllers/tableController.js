const Table = require("../models/table");

// Add Table
const addTable = async (req, res) => {
  try {
    const { restaurant, tableNumber, capacity } = req.body;

    const table = await Table.create({
      restaurant,
      tableNumber,
      capacity,
    });

    res.status(201).json({
      message: "Table added successfully",
      table,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getTables = async (req, res) => {
    try {
        const tables = await Table.find().populate("restaurant");

        res.status(200).json({
  message: "Tables fetched successfully",
  tables,
});
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const getTableById = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id).populate("restaurant");

        if (!table) {
            return res.status(404).json({
                message: "Table not found",
            });
        }

        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const updateTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!table) {
            return res.status(404).json({
                message: "Table not found",
            });
        }

        res.status(200).json({
            message: "Table updated successfully",
            table,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const deleteTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);

        if (!table) {
            return res.status(404).json({
                message: "Table not found",
            });
        }

        res.status(200).json({
            message: "Table deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
module.exports = {
  addTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
};