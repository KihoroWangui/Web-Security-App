const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = []; // In-memory "database" of users for simplicity

// Register User
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find((user) => user.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};
