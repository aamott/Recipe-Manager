const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe Manager',
    description: 'A web app for managing recipes'
  },
  host: 'therecipetracker.herokuapp.com',
  // host: 'localhost:8080',
  schemes: ['https'],
  securityDefinitions: {
    oAuthSample: {
      type: 'oauth2',
      authorizationUrl: 'https://therecipetracker.herokuapp.com/login',
      // authorizationUrl: 'localhost:8080/login',
      flow: 'implicit',
      scopes: {
        read_recipes: 'read your recipes',
        write_recipes: 'modify recipes in your account'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Your project's root file
});
