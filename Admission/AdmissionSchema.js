const mongoose = require('mongoose');

const admissionSchema = mongoose.Schema({
    studentName: {type: String, required: true},
    dob: {type: String, required: true},
    gender: {type: String, required: true},
    className: {type: String, required: true},
    prevSchool: {type: String, required: true},
    guardianName: {type: String, required: true},
    guardianContact: {type: String, required: true},
    guardianEmail: {type: String},
    address: {type: String, required: true},
    status: {type: String, required: true, default: "Pending", enum:["Pending", "Approved"]},
}, {timestamps: true});


module.exports = mongoose.model('admission', admissionSchema);