const express = require("express");
const userRouter = require("./routes/userRoute");
const connectDB = require("./utils/connectDB");

// ? db connection
connectDB()

// ? creating an instance of express
const app = express();
const PORT = 5000;

// ? routes
app.use("/api/user", userRouter)

//? starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});