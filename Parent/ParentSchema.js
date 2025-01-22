const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema(
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
        childrenName: {
            type: [String],
        },
        childrenRole: {
            type: String,
        },
        childrenClass: {
            type: String,
        },
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model("parent", ParentSchema);
