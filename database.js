const { Sequelize } = require('sequelize');
const path = require("path");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'jokes.db')
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize;