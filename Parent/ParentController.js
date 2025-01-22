const ParentSchema = require('./ParentSchema')
const admin = require("firebase-admin");

exports.getAllParents = async (req, res) => {
    try {
        const teachers = await ParentSchema.find()
        res.status(200).json(teachers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteParent = async (req, res) => {
    try {
        const { firebaseUid } = req.params;

        // Delete the Parent document from the database
        const Parent = await ParentSchema.findOneAndDelete({ firebaseUid });
        if (!Parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        const uid = firebaseUid;
        // Delete the user from Firebase Authentication
        await admin.auth().deleteUser(uid);

        // Send a success response
        res.status(204).send('Parent deleted successfully');
    } catch (error) {
        console.error('Error deleting Parent:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateParent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedParent = await ParentSchema.findOneAndUpdate({ _id: id }, req.body);

        if (!updatedParent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.json(updatedParent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
