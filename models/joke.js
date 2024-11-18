const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Joke = sequelize.define("Joke", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Joke;
