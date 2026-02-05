const express = require("express");
const Lab = require("../models/Lab");
const auth = require("../middleware/auth");

const router = express.Router();

// Create Lab
router.post("/", auth, async (req, res) => {
  const lab = await Lab.create({
    name: req.body.name,
    description: req.body.description,
    ownerId: req.user.id
  });
  res.json(lab);
});

// Get all Labs
router.get("/", auth, async (req, res) => {
  const labs = await Lab.findAll();
  res.json(labs);
});

module.exports = router;
