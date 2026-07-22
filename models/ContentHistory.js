const mongoose = require("mongoose");

// ? creating a schema for the content history
const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
});

const History = mongoose.mongo("History", historySchema)
module.exports = History
