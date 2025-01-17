const express = require('express');
const { postResult, getClassResult, getSingleResult } = require('./ResultController');
const router = express.Router();

router.post("/post-result", postResult);
router.post('/get-single-result', getSingleResult);
router.post('/get-class-result', getClassResult);

module.exports = router;