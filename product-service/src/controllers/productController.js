const Product = require("../models/Product");
const rabbitmqService = require("../services/rabbitmqService");

const createProduct = async (req, res) => {
  try {
    const { name, price, inventory } = req.body;
    const product = new Product({ name, price, inventory });
    await product.save();

    // Emit Product Created event
    await rabbitmqService.emitEvent("Product Created", {
      productId: product._id,
      name,
      price,
    });

    // Return id, name, price, and inventory
    res
      .status(201)
      .json({
        id: product._id,
        name: product.name,
        price: product.price,
        inventory: product.inventory,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};


const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { inventory } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inventory },
      { new: true }
    );

    // Emit Inventory Updated event
    await rabbitmqService.emitEvent("Inventory Updated", {
      productId: product._id,
      inventory,
    });

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

module.exports = {
  createProduct,
  updateInventory,
  getAllProducts,
  getProductById,
};

