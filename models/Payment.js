const mongoose = require("mongoose");

// ? creating a schema for the payments
const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    reference: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: "pending",
    },
    subscriptionPlan: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true
});

const Payment = mongoose.mongo("Payment", paymentSchema)
module.exports = Payment
