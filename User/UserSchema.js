const mongoose = require("mongoose");
const UserSchemaMethod = require("./userSchemaMethod");

const UserSchema = new mongoose.Schema(
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
        password: {
            type: String,
            required: true, // Password is now hashed before being saved
        },
        role: {
            type: String,
            required: true,
            default: "student",
            enum: ["student", "admin", "teacher", "parent"],
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
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
        }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Apply bcrypt methods and other custom methods/statics
UserSchemaMethod(UserSchema);


// Export the model
module.exports = mongoose.model("User", UserSchema);
