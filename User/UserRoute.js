// UserRoutes.js
const express = require("express");
const { register, getAllUsers, deleteUser, changeUserRole,  updateUser, checkRole, getSingleUser } = require("./UserController");
const { authMiddleware, adminCheck } = require("../Middleware/MIddleware");


const route = express.Router();

// Register Route
route.post("/register", register);

route.get("/users", getAllUsers);

route.get("/users/:firebaseUid", getSingleUser);


// Delete User Route
route.delete("/:uid",  deleteUser);

// Change User Role Route
route.put("/role",  changeUserRole);

// Check Admin Status Route
route.get("/check-role/:uid",  checkRole);

// Update User 
route.put('/:uid', adminCheck, updateUser)


module.exports = route;
