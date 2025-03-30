const bcrypt = require("bcryptjs");

const UserSchemaMethod = (schema) => {
    // Pre-save hook for password hashing
    schema.pre("save", async function (next) {
        if (!this.isModified("password")) return next(); // Skip if password isn't modified

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    });

    // Instance method to compare passwords
    schema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };
};

module.exports = UserSchemaMethod;
