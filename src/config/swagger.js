const swaggerJsDoc = require('swagger-jsdoc');

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
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./src/routes/v1/*.js'], 
};

module.exports = swaggerJsDoc(swaggerOptions);