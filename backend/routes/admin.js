const express = require("express");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/role");

const router = express.Router();

router.get("/dashboard", auth, requireRole("admin"), (req, res) => {
  res.json({
    message: "Welcome to DATONIUM Admin Dashboard",
    admin: req.user.email
  });
});

module.exports = router;
