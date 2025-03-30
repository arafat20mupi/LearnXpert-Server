const express = require("express");
const { getAllTeachers, deleteTeacher } = require("./TeacherController");

const route = express.Router();

route.get("/teachers", getAllTeachers);
route.delete("/teachers/:firebaseUid", deleteTeacher);

module.exports = route;