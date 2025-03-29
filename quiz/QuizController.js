const studentSchema = require('../Student/StudentSchema');
const QuizSchema = require('./QuizSchema');


const addQuizQuestions = async (req, res) => {
    try {
        // Check if questions already exist
        const quizQuestionExist = await QuizSchema.countDocuments();

        if (quizQuestionExist > 0) {
            return res.status(400).json({ success: false, message: "Quiz questions already exist" });
        }

        // Insert new questions
        const addedQuizQuestions = await QuizSchema.insertMany(req.body);

        res.status(201).json({ success: true, quizQuestions: addedQuizQuestions });
    } catch (error) {
        console.error("Error adding quiz questions:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const getQuizQuestions = async (req, res) => {
    try {
        const quizQuestions = await QuizSchema.find(); 

        if (!quizQuestions.length) {
            return res.status(404).json({ success: false, message: "No quiz questions found" });
        }

        console.log(quizQuestions.length);
        res.status(200).json({ success: true, quizQuestions }); 
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = {addQuizQuestions, getQuizQuestions};
