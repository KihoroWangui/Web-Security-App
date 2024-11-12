const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const secureRoutes = require("./routes/secure");
const authenticateJWT = require("./middleware/auth");

// Load environment variables
dotenv.config();

const app = express(); // Initialize the app here
app.use(express.json());
app.use(helmet()); // Set secure HTTP headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Serve a simple homepage
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Web Security App!</h1>");
});

app.use("/auth", authRoutes); // Authentication routes
app.use("/secure", authenticateJWT, secureRoutes); // Protected routes

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
