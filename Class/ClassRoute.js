const express = require('express');
const router = express.Router();
const { uploadVideo, getAllClasses, deleteClass, getClassByClassName } = require('./ClassController');
const upload = require('../Middleware/multer');

router.post('/upload-video', upload.array("videos"), uploadVideo); 
router.get('/classes', getAllClasses);
router.get('/classes/:className', getClassByClassName);
router.delete('/classes/:id', deleteClass); 

module.exports = router;
