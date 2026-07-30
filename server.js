const express = require("express");
const userRouter = require("./routes/userRoute");
const contentRouter = require("./routes/contentRoute");
const connectDB = require("./utils/connectDB");
const errorHandler = require("./middleware/errorHandelling");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"])

// ? creating an instance of express
const app = express();
const PORT = 5000;

// ? CORS configuration
app.use(cors({
  // frontend URL 
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true
}));

// ? routes
app.use(express.json());
app.use(cookieParser()); // passes the cookies to the req object
app.use("/api/user", userRouter)
app.use("/api/content", contentRouter)

// ? error handling middleware
app.use(errorHandler);

//? starting the server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();