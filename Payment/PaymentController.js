const PaymentSchema = require("./PaymentSchema");
const Stripe = require('stripe');
      

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
        res.status(500).json({message: error.message});
    }
}

exports.studentPayment = async(req, res) => {
   try {
        const {name, className, rollNo, email, firebaseUid, month, year, duePayment} = req.body.info;


        const stripe = new Stripe("sk_test_51QPkuRGLRxtB32IDb3zrzdHnHX9INDYJ4dJDhllYyIlbVOugC297GsHb7uZgqJ4U83yK9ydUEyAd6ibZ7XTKOn7e00AJBU8XwH")
        
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
            payment_method_types: ["card"],
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:5173/cancel",
            metadata: {
                firebaseUid: firebaseUid,
                month: month,
                year: year
            }
        });

       
        res.status(200).json({id: session.id, firebaseUid, month, year});

   } catch (error) {
        res.send('failed')
   }
}

exports.getPaymentDetail = async(req, res) => {
    const stripe = new Stripe("sk_test_51QPkuRGLRxtB32IDb3zrzdHnHX9INDYJ4dJDhllYyIlbVOugC297GsHb7uZgqJ4U83yK9ydUEyAd6ibZ7XTKOn7e00AJBU8XwH")
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        
        if(session.payment_status === "paid"){
            
            const {firebaseUid, month, year} = session.metadata;
            const updatePayment = await PaymentSchema.findOneAndUpdate({firebaseUid, "payment.month": month, "payment.year": year}, {$set: {"payment.$.status": "Paid"}}, {new: true})
            
            res.status(200).json({message: "Payment status updated", updatePayment})
        }else{
            res.status(401).json({message: "Payment unpaid"})
        }

        
        
      } catch (error) {
        res.status(500).json({ error: error.message }); 
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