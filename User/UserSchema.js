const mongoose = require("mongoose");
const UserSchemaMethod = require("./userSchemaMethod");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["student", "admin", "teacher", "parent"],
        default: "student",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, {
    timestamps: true
});

UserSchemaMethod(UserSchema);
module.exports = mongoose.model('user', UserSchema);
