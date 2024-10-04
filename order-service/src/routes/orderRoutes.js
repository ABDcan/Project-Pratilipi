const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById); // Get order by ID

module.exports = router;
