const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connectDB = async () => {
    //! mongo connection
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB connected");
        })
        .catch((e) => {
            console.log("DB connection failed, ", e);
        });
}

module.exports = connectDB