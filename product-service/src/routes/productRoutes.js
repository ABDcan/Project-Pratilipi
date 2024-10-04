const express = require("express");
const {
  createProduct,
  updateInventory,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const router = express.Router();

router.post("/products", createProduct);
router.put("/products/:id", updateInventory);
router.get("/products", getAllProducts); // Get all products
router.get("/products/:id", getProductById); // Get product by ID

module.exports = router;
