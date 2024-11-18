const express = require('express');
const sequelize = require('./config/database');
// const jokeRoutes = require('./routes/v1/jokes');
const jokeRoutes = require('./routes/v1/jokes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const cors = require('cors');
app.use(cors());

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
        url: 'http://localhost:3002',
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
  app.listen(3002, () => {
    console.log('Serveur démarré sur le port 3002');
  });
}).catch(error => console.error('Erreur de synchronisation:', error));
module.exports = app;