const express = require('express');
const { getQuizQuestions, addQuizQuestions } = require('./QuizController');
const router = express.Router();

router.post('/add-quiz-questions', addQuizQuestions);
router.get('/get-quiz-questions', getQuizQuestions);

module.exports = router;    