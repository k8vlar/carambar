const express = require("express");
const sequelize = require("./database");
const setupSwagger = require("./config/swagger"); Swagger
const path = require("path");
const jokeRoutes = require("./routes/v1/jokes");

const app = express();
const cors = require("cors");

app.use(cors({
  origin: 'https://k8vlar.github.io/carambarfrontend',
  methods: ['GET', 'POST','DELETE','PUT'],
  allowedHeaders: ['Content-Type'],
  credentials:true

}));
app.use(express.json());

// Configurer Swagger
setupSwagger(app);

// Routes API
app.use("/jokes", jokeRoutes); 

// Démarrage du serveur et synchronisation de la base de données
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
  });
}).catch((error) => console.error("Erreur de synchronisation:", error));

module.exports = app;