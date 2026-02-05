const express = require("express");
const Message = require("../models/Message");
const auth = require("../middleware/auth");

const router = express.Router();

/* Send message to channel */
router.post("/:channelId", auth, async (req, res) => {
  const { content } = req.body;
  const { channelId } = req.params;

  const message = await Message.create({
    content,
    UserId: req.user.id,
    ChannelId: channelId
  });

  res.json(message);
});

/* Get messages of a channel */
router.get("/:channelId", auth, async (req, res) => {
  const messages = await Message.findAll({
    where: { ChannelId: req.params.channelId },
    order: [["createdAt", "ASC"]]
  });

  res.json(messages);
});

module.exports = router;
