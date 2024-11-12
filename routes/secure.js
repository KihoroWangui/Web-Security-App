const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({
    message: `Welcome ${req.user.username} to the secure dashboard!`,
  });
});

module.exports = router;
