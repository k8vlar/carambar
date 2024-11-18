// const express = require("express");
// const swaggerUi = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");

// const app = express();

// app.use(express.json());

// // Configuration Swagger
// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "API de blagues Carambar & Co",
//       version: "1.0.0",
//       description: "Une API pour gérer les blagues Carambar",
//     },
//   },
//   apis: ["./routes/v1/*.js"],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Routes
// app.use("/api/v1", require("./routes/v1/jokes"));

// module.exports = app;

const express = require('express');
const sequelize = require('./config/database');
const jokeRoutes = require('./routes/v1/jokes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(express.json());

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de blagues Carambar & Co',
      version: '1.0.0',
      description: 'Une API pour gérer les blagues Carambar',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/v1/jokes', jokeRoutes);

// Synchronisation de la base de données et démarrage du serveur
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
  });
});

module.exports = app;