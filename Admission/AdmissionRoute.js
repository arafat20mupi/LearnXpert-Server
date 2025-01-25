const express = require('express');

const { submitAdmissionData, getAdmissionData, changeStatus, deleteAdmissionData } = require('./AdmissionController');

const router = express.Router();

router.post('/submit-admission-data', submitAdmissionData);
router.get('/get-admission-data', getAdmissionData);
router.delete('/delete-admission-data/:id', deleteAdmissionData);
router.put('/change-status/:id', changeStatus);

module.exports = router;