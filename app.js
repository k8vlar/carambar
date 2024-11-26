const express = require("express");
const sequelize = require("./database");
// const jokeRoutes = require('./routes/v1/jokes');
const jokeRoutes = require("./routes/v1/jokes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
// const Jokes = require("./models/joke");
const { addJoke, getAllJokes, getJokeById, getRandomJoke } = require("./controllers/jokeController");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de blagues Carambar & Co",
      version: "1.0.0",
      description: "Une API pour gérer les blagues Carambar",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// console.log(swaggerDocs);
// Middleware
// Servir les fichiers statiques depuis le dossier 'frontend'
app.use(express.static(path.join(__dirname, "frontend")));
// Middleware pour parser le JSON des requêtes POST
app.use(bodyParser.json());



// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


// Routes API

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - reponse
 *             properties:
 *               question:
 *                 type: string
 *                 description: La question de la blague.
 *               reponse:
 *                 type: string
 *                 description: La réponse de la blague.
 *     responses:
 *       201:
 *         description: Blague ajoutée avec succès.
 */
app.post('/jokes', addJoke); // Ajouter une nouvelle blague

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Consulter toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: Liste des blagues.
 */
app.get('/jokes', getAllJokes); // Consulter toutes les blagues

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Consulter une blague aléatoire
 *     tags: [Jokes]
 */
app.get('/jokes/random', getRandomJoke); // Consulter une blague aléatoire

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Consulter une blague par ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la blague à consulter.
 *     responses:
 *       200:
 *         description: Détails de la blague.
 */
app.get('/jokes/:id', getJokeById); // Consulter une blague par ID





// Synchronisation de la base de données et démarrage du serveur
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Serveur démarré sur le port 3000");
    });
  })
  .catch((error) => console.error("Erreur de synchronisation:", error));
  
module.exports = app;
