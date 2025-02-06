const { postPayment, paymentDetails, studentPayment, deleteSingle, deleteAll, singlePaymentDetail } = require('./PaymentController');
const router = require('express').Router();

router.post('/post-payment', postPayment);
router.get('/payment-details', paymentDetails);
router.get('/payment-details/:firebaseUid', singlePaymentDetail);
router.post('/checkout', studentPayment);
router.delete('/payment-delete-all', deleteAll);
router.delete('/payment-single-delete/:firebaseUid', deleteSingle);

module.exports = router;