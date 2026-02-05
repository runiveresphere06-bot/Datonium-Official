const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Lab = sequelize.define("Lab", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Lab;
