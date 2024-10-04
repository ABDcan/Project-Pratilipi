require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(3003, () => console.log("Order Service running on port 3003"))
  )
  .catch((err) => console.error("MongoDB connection error:", err));
