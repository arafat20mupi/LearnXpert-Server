//   for making password hashing ny using bcrypt
const bcrypt = require("bcryptjs");
const UserSchemaMethod = (schema) => {
    schema.pre("save", async function (next) {
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password, salt);
        next();
    });
    // Compare password method
    schema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };
};
module.exports = UserSchemaMethod;