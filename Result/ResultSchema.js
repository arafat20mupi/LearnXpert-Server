const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
    studentId: {type: String, required: true},
    name: {type: String, required: true},
    className: {type: String, required: true},
    rollNo: {type: String, required: true},
    marks: [
        {
            subject: String,
            mark: Number,
        },
    ] 
}, {timestamps: true});


module.exports = mongoose.model("Result", ResultSchema);