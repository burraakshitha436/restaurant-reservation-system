const express = require("express");
const router = express.Router();

const { addTable,getTables,getTableById,updateTable,deleteTable, } = require("../controllers/tableController");
const { protect, admin } = require("../middleware/authMiddleware");
// Add Table
router.post("/", protect, admin, addTable);
router.get("/", getTables);
router.get("/:id", getTableById);
router.put("/:id", protect, admin, updateTable),
router.delete("/:id",protect,admin, deleteTable);

module.exports = router;