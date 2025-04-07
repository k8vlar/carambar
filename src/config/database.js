const { Sequelize } = require('sequelize');
const path = require("path");
const fs = require('fs');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'jokes.db')
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync(); // Synchroniser le modèle avec la base de données
  })
  .then(() => {
    // Lire le fichier init.sql
    const initSqlPath = path.join(__dirname, 'init.sql');
    const initSql = fs.readFileSync(initSqlPath, 'utf8');

    // Exécuter le fichier SQL
    return sequelize.query(initSql);
  })
  .then(() => {
    console.log('Data has been inserted successfully from init.sql.');
  })
  .catch(err => {
    console.error('Unable to connect to the database or execute SQL:', err);
  });

module.exports = sequelize;