const TeacherSchema = require('./TeacherSchema')
const admin = require("firebase-admin");

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await TeacherSchema.find()
        res.status(200).json(teachers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteTeacher = async (req, res) => {
    try {
        const { firebaseUid } = req.params;

        // Delete the teacher document from the database
        const teacher = await TeacherSchema.findOneAndDelete({ firebaseUid });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const uid = firebaseUid;
        // Delete the user from Firebase Authentication
        await admin.auth().deleteUser(uid);

        // Send a success response
        res.status(204).send('Teacher deleted successfully'); 
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: error.message });
    }
};

