const mongoose = require("mongoose");

// ? creating a schema for the user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    // ? it is here to manage the free trial for 'n' days
    trialActive: {
        type: Boolean,
        default: true,
    },
    trialExpires: {
        type: Date
    },
    subscription: {
        type: String,
        enum: ["Free", "Basic", "Premium"]
    },
    apiRequestCount: {
        type: Number,
        default: 0,
    },
    monthlyRequestCount: {
        type: Number,
        default: 0,
    },
    nextBillingDate: Date,
    payments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Payment",
        }
    ],
    history: [
        {
            type: mongoose.Types.ObjectId,
            ref: "History",
        }
    ],
},
{
    timestamps: true
});

const User = mongoose.mongo("User", userSchema)
module.exports = User
