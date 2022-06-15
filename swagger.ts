const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe Manager',
    description: 'A web app for managing recipes'
  },
  host: 'therecipetracker.herokuapp.com',
  schemes: ['https'],
  securityDefinitions: {
    oAuthSample: {
      type: 'oauth2',
      authorizationUrl: 'therecipetracker.herokuapp.com/login',
      flow: 'implicit',
      scopes: {
        read_pets: 'read your recipes',
        write_pets: 'modify recipes in your account'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Your project's root file
});
