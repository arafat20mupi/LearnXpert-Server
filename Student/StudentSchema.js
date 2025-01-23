const mongoose = require("mongoose");

const StutentSchema = new mongoose.Schema(
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
        className : {
            type: String,
            default: "6",
            enum: ["6", "7", "8", "9", "10"],
        },
        rollNo : {
            type: String,
        }
    },
    {
        timestamps: true, 
    }
);


module.exports = mongoose.model("student", StutentSchema);
