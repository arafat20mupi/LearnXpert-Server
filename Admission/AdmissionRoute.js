const express = require('express');

const { submitAdmissionData, getAdmissionData, deleteAdmissionData, admissionReject, admissionApprove } = require('./AdmissionController');

const router = express.Router();

router.post('/submit-admission-data', submitAdmissionData);
router.get('/get-admission-data', getAdmissionData);
router.delete('/delete-admission-data/:id', deleteAdmissionData);
router.put('/admission-approve/:id', admissionApprove);
router.put('/admission-reject/:id', admissionReject);

module.exports = router;