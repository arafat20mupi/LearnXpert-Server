const { postPayment, paymentDetails, studentPayment, deleteSingle, deleteAll, singlePaymentDetail, paymentWebhook } = require('./PaymentController');
const router = require('express').Router();
const bodyParser = require('body-parser');
const express = require("express");

router.post('/post-payment', postPayment);
router.get('/payment-details', paymentDetails);
router.get('/payment-details/:firebaseUid', singlePaymentDetail);
router.post('/checkout', studentPayment);
router.post('/webhook', express.raw({ type: "application/json" }), paymentWebhook);
router.delete('/payment-delete-all', deleteAll);
router.delete('/payment-single-delete/:firebaseUid', deleteSingle);

module.exports = router;