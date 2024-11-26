const express = require("express");
const sequelize = require("./database");
// const jokeRoutes = require('./routes/v1/jokes');
const jokeRoutes = require("./routes/v1/jokes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const Jokes = require("./models/joke");

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
// console.log(swaggerDocs);
// Middleware
// app.use(express.static(path.join(__dirname, "frontend")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/routes/v1/jokes", jokeRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


app.get('/jokes/random', async (req, res) => {
  try {
      const joke = await Jokes.findOne({
          order: sequelize.random(),
      });
      if (joke) {
          res.json({ content: `${joke.question} - ${joke.reponse}` });
      } else {
          res.status(404).json({ error: 'Aucune blague trouvée' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur' });
  }
});
app.get("/test-jokes", async (req, res) => {
  try {
    const jokesall = await Jokes.findAll();
    res.json(jokesall);
  } catch (error) {
    console.error("Erreur:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des blagues" });
  }
});

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
