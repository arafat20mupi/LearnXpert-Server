const PaymentSchema = require("./PaymentSchema");
const Stripe = require('stripe');

const stripe = new Stripe('your-secret-key-here');

exports.postPayment = async (req, res) => {
    try {
        const { name, className, rollNo, email, firebaseUid, year, month, duePayment } = req.body.paymentDetail;
        const findStudent = await PaymentSchema.findOne({ firebaseUid });
        if (findStudent) {
            const hansMonth = findStudent.payment.some(item => item.month === month && item.year === year);

            if (hansMonth) {
                res.status(200).json({ message: "month exists" })
            } else {
                const updatePayment = await PaymentSchema.findOneAndUpdate({ firebaseUid: findStudent.firebaseUid }, { $push: { payment: { month, year, duePayment } } })
                res.status(200).json({ message: "month payment updated successfully", updatePayment })
            }

        } else {
            const payment = new PaymentSchema({
                name, className, rollNo, email, firebaseUid, payment: [{ month, year, duePayment }]
            })
            await payment.save();
            res.status(200).json({ message: "Payment detail added", payment })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
}

exports.paymentDetails = async (req, res) => {
    try {
        const paymentDetails = await PaymentSchema.find();
        res.status(200).json(paymentDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.singlePaymentDetail = async (req, res) => {
    try {
        const { firebaseUid } = req.params;
        const paymentDetails = await PaymentSchema.findOne({ firebaseUid });
        res.status(200).json(paymentDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteSingle = async (req, res) => {
    try {
        const { firebaseUid } = req.params;
        const deleteDetails = await PaymentSchema.deleteOne({ firebaseUid });
        res.status(200).json({ message: "All payment details deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteAll = async (req, res) => {
    try {
        const result = await PaymentSchema.deleteMany({});
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No documents found to delete." });
        }
        res.status(200).json({ message: "All payment details deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createPaymentIntent = async (req, res) => {
    try {
        const { firebaseUid, month, year, duePayment } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: duePayment * 100, // amount in cents
            currency: 'usd',
            metadata: { firebaseUid, month, year }
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.paymentComplete = async (req, res) => {
    try {
        const { firebaseUid, month, year, duePayment } = req.body;
        const findStudent = await PaymentSchema.findOne({ firebaseUid });
        // Update payment status after successful payment
        if (findStudent) {
            const paymentIndex = findStudent.payment.findIndex(
                (item) => item.month === month && item.year === year
            );
            if (paymentIndex !== -1) {
                findStudent.payment[paymentIndex].status = 'Paid';
                await findStudent.save();
                res.status(200).json({ message: 'Payment completed successfully' });
            } else {
                res.status(404).json({ message: 'Payment record not found' });
            }
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
}