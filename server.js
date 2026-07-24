const express = require("express");
const userRouter = require("./routes/userRoute");
const connectDB = require("./utils/connectDB");
const dns = require("dns")

dns.setServers(["1.1.1.1", "8.8.8.8"])
// ? creating an instance of express
const app = express();
const PORT = 5000;

// ? routes
app.use(express.json());
app.use("/api/user", userRouter)

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