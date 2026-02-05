const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Lab = require("./Lab");

const Channel = sequelize.define("Channel", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Lab.hasMany(Channel);
Channel.belongsTo(Lab);

module.exports = Channel;
