const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const User = require("../models/User");

const router = express.Router();

/* List all users (ADMIN ONLY) */
router.get("/users", auth, role("admin"), async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "username", "email", "role"]
  });
  res.json(users);
});

/* Promote user */
router.post("/promote/:id", auth, role("admin"), async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.role = req.body.role;
  await user.save();

  res.json({ message: "Role updated", user });
});

module.exports = router;
