const { postPayment, paymentDetails, studentPayment, deleteSingle, deleteAll, singlePaymentDetail, getPaymentDetail } = require('./PaymentController');
const router = require('express').Router();
const bodyParser = require('body-parser');


router.post('/post-payment', postPayment);
router.get('/payment-details', paymentDetails);
router.get('/payment-details/:firebaseUid', singlePaymentDetail);
router.post('/checkout', studentPayment);
router.get('/retrieve/:sessionId', getPaymentDetail);
router.delete('/payment-delete-all', deleteAll);
router.delete('/payment-single-delete/:firebaseUid', deleteSingle);

module.exports = router; 