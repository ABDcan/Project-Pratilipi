const express = require("express");
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get user by ID
router.put("/:id", updateUser); // Update user

module.exports = router;
