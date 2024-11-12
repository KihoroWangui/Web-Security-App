const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const secureRoutes = require("./routes/secure");
const authenticateJWT = require("./middleware/auth");
const path = require("path");

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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Authentication and protected routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/secure", authenticateJWT, secureRoutes); // Protected routes

// If there's no specific route match, fallback to serving login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
