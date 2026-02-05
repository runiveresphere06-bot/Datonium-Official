const express = require("express");
const Channel = require("../models/Channel");
const auth = require("../middleware/auth");

const router = express.Router();

/* Create channel inside a lab */
router.post("/:labId", auth, async (req, res) => {
  const { name } = req.body;
  const { labId } = req.params;

  const channel = await Channel.create({
    name,
    LabId: labId
  });

  res.json(channel);
});

/* Get channels of a lab */
router.get("/:labId", auth, async (req, res) => {
  const channels = await Channel.findAll({
    where: { LabId: req.params.labId }
  });

  res.json(channels);
});

module.exports = router;
