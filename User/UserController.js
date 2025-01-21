const admin = require("firebase-admin");
const User = require("./UserSchema");

exports.register = async (req, res) => {
    const { email, password, name, role, uid , phone , address , className } = req.body;

    console.log(req.body);
    if (!email || !password || !name || !role || !uid ) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {

        // Create user in your MongoDB database
        const newUser = new User({
            name,
            email,
            password,
            role,
            phone,
            address,
            className,
            firebaseUid: uid,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during user registration" });
    }
}



// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).send("User not found");

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).send("Invalid credentials");

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        // Firebase theke users niye asha
        const listUsersResult = await admin.auth().listUsers();
        const firebaseUsers = listUsersResult.users; // Firebase er users array

        // MongoDB theke users niye asha
        let dbUsers = [];
        try {
            dbUsers = await User.find(); // User hocche apnar MongoDB user model
        } catch (dbError) {
            console.error("Database error:", dbError);
        }

        // Firebase ebong MongoDB users ke ek sathe response er maddhome pathano
        res.status(200).json({ firebaseUsers, dbUsers });
    } catch (error) {
        console.error("Firebase user error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Example of checking a user's role
exports.checkRole = async (req, res) => {
    const { uid } = req.params;

    if (!uid || typeof uid !== "string" || uid.length === 0) {
        return res.status(400).json({ error: "Invalid UID provided" });
    }

    try {
        // Fetch user record by UID
        const userRecord = await admin.auth().getUser(uid);

        // Check if user has the custom claim (role) set
        const userRole = userRecord.customClaims?.role;
        console.log(userRole);
        // Check if the role exists and send it in the response
        if (userRole) {
            return res.status(200).json({ role: userRole });
        } else {
            return res.status(404).json({ error: "Role not found for user" });
        }
    } catch (error) {
        console.error("Error checking user role:", error);

        if (error.code === "auth/user-not-found") {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(500).json({ error: error.message });
    }
};


// Delete User
exports.deleteUser = async (req, res) => {
    const { uid } = req.params; // Get the Firebase UID from the request parameters

    try {
        // Delete the user directly from Firebase
        await admin.auth().deleteUser(uid);

        res.status(200).send("User deleted successfully from Firebase");
    } catch (error) {
        console.error("Error deleting user from Firebase:", error);
        res.status(500).json({ error: error.message });
    }
};

// Change User Role
exports.changeUserRole = async (req, res) => {
    const { email, role } = req.body;
    console.log("Received email:", email);
    try {
        // Find Firebase user by email
        const userRecord = await admin.auth().getUserByEmail(email);
        const uid = userRecord.uid;

        // Set custom claims for the user
        await admin.auth().setCustomUserClaims(uid, { role });


        res.status(200).json({ message: `User role changed to ${role}` });
    } catch (error) {
        console.error("Error changing user role:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    const { uid } = req.params; 
    const updateData = req.body; 

    try {
        const firebaseUpdates = {};

     
        if (updateData.email) firebaseUpdates.email = updateData.email;
        if (updateData.displayName)
            firebaseUpdates.displayName = updateData.displayName;

        // Update user in Firebase if there are fields to update
        const updatedUser = await admin.auth().updateUser(uid, firebaseUpdates);

        // Update user in MongoDB
        const updatedDBUser = await User.findOneAndUpdate(
            { firebaseUid: uid },
            { ...updateData }, // Update with all fields provided
            { new: true }
        );
        res.status(200).json({
            message: "User updated successfully",
            firebaseUser: updatedUser,
            dbUser: updatedDBUser,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: error.message });
    }
};