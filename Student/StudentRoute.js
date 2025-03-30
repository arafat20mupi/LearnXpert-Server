const express = require("express");
const { getAllStudent, deleteStudent, updateStudent, getAllStudents, getSingleStudent, addQuizScore, removeQuizScore } = require("./StudentController");

const route = express.Router();

route.get("/students/:className", getAllStudent);
route.delete("/students/:firebaseUid", deleteStudent);
route.put("/students/:id", updateStudent);
route.get("/students" , getAllStudents);
route.get("/get-single-student/:firebaseUid", getSingleStudent);
route.post('/add-quiz-score', addQuizScore);
route.put('/remove-quiz-score/:firebaseUid', removeQuizScore);

module.exports = route;