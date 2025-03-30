const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
        },
        firebaseUid: {
            type: String,
            required: true,
            unique: true,
        },
        phone : {
            type: String,
        },
        address : {
            type: String,
        },
        subjects: [{
            type: String,
        }],
    },
    {
        timestamps: true, 
    }
);


module.exports = mongoose.model("teacher", TeacherSchema);
