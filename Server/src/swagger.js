import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      version: "1.0.0",
      title: "Blogs REST API",
      description: "Blog posts API",
      contact: {
        name: "Kar David",
      },
    },
    servers: [`http://localhost:${process.env.NODE_ENV}`],
  },
  apis: [`${__dirname}/openapi.yaml`],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerDocs = (app, port) => {
  // swagger page
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
