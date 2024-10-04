const Order = require("../models/Order");
const rabbitmqService = require("../services/rabbitmqService");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const order = new Order({ userId, products });
    await order.save();

    // Emit Order Placed event
    await rabbitmqService.emitEvent("Order Placed", {
      orderId: order._id,
      userId,
      products,
    });

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order" });
  }
};

module.exports = { createOrder, getOrders, getOrderById };

