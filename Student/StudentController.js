const admin = require("firebase-admin");
const studentSchema = require('./StudentSchema');
const StudentSchema = require("./StudentSchema");

exports.getAllStudent = async (req, res) => {
    try {
        const {className} = req.params;
        const students = await studentSchema.find({className});
        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getSingleStudent = async (req, res) => {
    try {
           
           const {firebaseUid} = req.params;
           const students = await studentSchema.findOne({firebaseUid});
           res.status(200).json({success: true, students});
           
       } catch (error) {
           res.status(500).json({ message: error.message });
           console.log(error.message);
       }
}


exports.deleteStudent = async (req, res) => {
    try {
        const { firebaseUid } = req.params;

        // Delete the student document from the database
        const student = await studentSchema.findOneAndDelete({ firebaseUid });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const uid = firebaseUid;
        // Delete the user from Firebase Authentication
        await admin.auth().deleteUser(uid);

        // Send a success response
        res.status(204).send('Student deleted successfully'); 
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllStudents = async (req , res) => {
    try {
        const students = await studentSchema.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { className, rollNo } = req.body;
  try {
    const student = await studentSchema.findOneAndUpdate({ _id: id }, { className, rollNo }, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.addQuizScore = async(req, res) => {
    try {
        const {firebaseUid, totalScore, tenQuestions} = req.body;

        const questions = tenQuestions.map(q => q.question)
        const updateQuizScore = await StudentSchema.findOneAndUpdate({firebaseUid}, {$inc: {"quizScore.score": totalScore}, $push: {"quizScore.questionsAnswered": {$each: questions}}}, {new: true});

        console.log(updateQuizScore);
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
}

exports.removeQuizScore = async(req, res) => {
    try {
        const {firebaseUid} = req.params;

       
        const updateQuizScore = await StudentSchema.findOneAndUpdate({firebaseUid}, {$set: {"quizScore.score": 0, "quizScore.questionsAnswered": []}}, {new: true});
        res.status(200).json({suceess: true, message: "QuizScore removed"})
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
}

