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
        },
        roleNo : {
            type: String,
        }
    },
    {
        timestamps: true, 
    }
);


module.exports = mongoose.model("student", StutentSchema);
