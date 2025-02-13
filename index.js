const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./Config/dbConfig");
require("dotenv").config();

// Import routes
const userRoutes = require("./User/UserRoute");
const resultRoute = require("./Result/ResultRoute");
const teacherRoute = require("./Teacher/TeacherRoute");
const studentRoute = require('./Student/StudentRoute')
const parentRoute = require("./Parent/ParentRoute");
const admissionRoute = require('./Admission/AdmissionRoute');
const paymentRoute = require('./Payment/PaymentRoute');

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); 

// Import routes

app.use('/api' , userRoutes)
app.use('/api' , resultRoute)
app.use('/api' , teacherRoute)
app.use('/api' , studentRoute)
app.use('/api' , parentRoute)
app.use('/api' , admissionRoute);
app.use('/api', paymentRoute);

//  Home route
app.get("/", (req, res) => {
  res.send("hello Developers");
});


// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
