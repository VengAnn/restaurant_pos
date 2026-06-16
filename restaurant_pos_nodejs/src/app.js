require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const config = require("./config/config");
const connectDB = require("./config/database");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const PORT = config.port;
connectDB();

// Enable CORS for the frontend application
app.use(
  cors({
    credentials: true, // required for cookies
    origin: ["http://localhost:5173"],
  }),
);
// parse incoming request in json format
app.use(express.json());
// Parse incoming cookies and populate req.cookies with the cookie data
app.use(cookieParser());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello From Pos restuarant Server!" });
});

// Other enpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/menu", require("./routes/menuRoute"));

// Global ErrorHandler
app.use(globalErrorHandler);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
