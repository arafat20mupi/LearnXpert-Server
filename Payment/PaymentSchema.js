const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        className: {type: String, required: true},
        rollNo: {type: String, required: true},
        email: {type: String, required: true},
        firebaseUid: {type: String, required: true},
        payment: [
            {
                month: {
                    type: String,
                    required: true
                },
                year : {
                    type: String,
                    required: true
                },
                duePayment: {
                    type: String,
                    required: true,
                    default: 0
                },
                status: {
                    type: String,
                    required: true,
                    default: "Pending",
                    enum: ["Pending", "Paid"]
                }
            }
        ]
    },
    {
        timestamps: true, 
    }
);


module.exports = mongoose.model("payment", PaymentSchema);
