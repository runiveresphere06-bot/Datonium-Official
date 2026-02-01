const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./datonium.sqlite",
  logging: false
});

module.exports = sequelize;
