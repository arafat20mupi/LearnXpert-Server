// UserRoutes.js
const express = require("express");
const { register, login, getAllUsers, deleteUser, changeUserRole, checkAdmin, updateUser } = require("./UserController");
const { authMiddleware, adminCheck } = require("../Middleware/MIddleware");


const route = express.Router();

// Register Route
route.post("/register", register);

// Login Route
route.post('/login', login);

// Get All Users Route
route.get("/", authMiddleware, getAllUsers);

// Delete User Route
route.delete("/:uid", authMiddleware, deleteUser);

// Change User Role Route
route.put("/role", authMiddleware, adminCheck, changeUserRole);

// Check Admin Status Route
route.get("/check-admin/:uid", authMiddleware, checkAdmin);

// Update User Route
route.put('/:uid', authMiddleware, adminCheck, updateUser);

module.exports = route;
