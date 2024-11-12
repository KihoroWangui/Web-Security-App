const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const secureRoutes = require("./routes/secure");
const authenticateJWT = require("./middleware/auth");

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet()); // Set secure HTTP headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use("/auth", authRoutes); // Authentication routes
app.use("/secure", authenticateJWT, secureRoutes); // Protected routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
