const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes',
    description: 'A web app for managing recipes'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
