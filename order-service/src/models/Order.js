const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [productSchema],
  },
  { timestamps: true }
);

// Create a virtual 'id' field
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true, // Ensure virtual fields are serialized
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
