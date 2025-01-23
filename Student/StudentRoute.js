const express = require("express");
const { getAllStudent, deleteStudent, updateStudent, getAllStudents } = require("./StudentController");

const route = express.Router();

route.get("/students/:className", getAllStudent);
route.delete("/students/:firebaseUid", deleteStudent);
route.put("/students/:id", updateStudent);
route.get("/students" , getAllStudents);

module.exports = route;