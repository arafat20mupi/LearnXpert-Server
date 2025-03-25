const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["multiple", "boolean"],
        },
        difficulty: {
            type: String,
            required: true,
            enum: ["easy", "medium", "hard"],
        },
        category: {
            type: String,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        correct_answer: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
