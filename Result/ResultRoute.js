const express = require('express');
const { postResult, getClassResult, getSingleResult, getAllResults } = require('./ResultController');
const router = express.Router();

router.post("/post-result", postResult);
router.get('/get-single-result/:className/:rollNo', getSingleResult);
router.post('/get-class-result', getClassResult);
router.get('/result', getAllResults);

module.exports = router;