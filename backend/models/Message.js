const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Channel = require("./Channel");

const Message = sequelize.define("Message", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Relations
User.hasMany(Message);
Message.belongsTo(User);

Channel.hasMany(Message);
Message.belongsTo(Channel);

module.exports = Message;
