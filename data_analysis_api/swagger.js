// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Data Analysis API',
      version: '1.0.0',
      description: 'API documentation for data analysis microservice',
    },
    servers: [
      {
        url: 'https://off-campus-admin-djux.onrender.com',
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust this if needed
};

const specs = swaggerJSDoc(options);

export default specs;
//