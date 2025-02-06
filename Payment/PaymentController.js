const PaymentSchema = require("./PaymentSchema");
const Stripe = require('stripe');


exports.postPayment = async(req, res) => {
   try {
        const {name, className, rollNo, email, firebaseUid, year, month, duePayment} = req.body.paymentDetail;
        const findStudent = await PaymentSchema.findOne({firebaseUid});
        if(findStudent){
            const hansMonth = findStudent.payment.some(item => item.month === month && item.year === year );

            if(hansMonth){
                res.status(200).json({message: "month exists"})
            }else{
                const updatePayment = await PaymentSchema.findOneAndUpdate({firebaseUid: findStudent.firebaseUid},{$push: {payment: {month, year, duePayment}}})
                res.status(200).json({message: "month payment updated successfully", updatePayment})
            }
           
        }else{
            const payment = new PaymentSchema({
                name, className, rollNo, email, firebaseUid, payment: [{month, year, duePayment}]
            })
            await payment.save();
            res.status(200).json({message: "Payment detail added", payment})
        }
       
   } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error.message);
   }
}

exports.paymentDetails = async(req, res) => {
    try {
        const paymentDetails = await PaymentSchema.find();
        res.status(200).json(paymentDetails);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.singlePaymentDetail = async(req, res) => {
    try {
        const {firebaseUid} = req.params;
        const paymentDetails = await PaymentSchema.findOne({firebaseUid});
        res.status(200).json(paymentDetails);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.studentPayment = async(req, res) => {
   try {
        const {name, className, rollNo, email, month, year, duePayment} = req.body.info;


        const stripe = new Stripe("sk_test_51QPkuRGLRxtB32IDb3zrzdHnHX9INDYJ4dJDhllYyIlbVOugC297GsHb7uZgqJ4U83yK9ydUEyAd6ibZ7XTKOn7e00AJBU8XwH");
      
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: "bdt",
                    product_data:{
                        name: name,
                    },
                    unit_amount: duePayment * 100,
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        console.log(session.payment_status, session.id);
        res.status(200).json({id: session.id});

   } catch (error) {
        res.send('failed')
        console.log(error.message);
   }
}

exports.deleteSingle = async(req, res) => {
    try {
        const {firebaseUid} = req.params;
        const deleteDetails = await PaymentSchema.deleteOne({firebaseUid});
        res.status(200).json({message: "All payment details deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.deleteAll = async(req, res) => {
    try {
        const result = await PaymentSchema.deleteMany({});
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No documents found to delete." });
        }
        res.status(200).json({message: "All payment details deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}