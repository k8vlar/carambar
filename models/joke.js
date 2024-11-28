const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Jokes extends Model {}
Jokes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reponse: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Jokes",
    tableName: "jokes",
    timestamps: false,
  }
);

module.exports = Jokes;
