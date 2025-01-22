const express = require("express");
const { getAllStudent, deleteStudent, updateStudent } = require("./StudentController");

const route = express.Router();

route.get("/students", getAllStudent);
route.delete("/students/:firebaseUid", deleteStudent);
route.put("/students/:id", updateStudent);

module.exports = route;