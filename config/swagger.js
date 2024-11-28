const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
  apis: ["./routes/v1/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;