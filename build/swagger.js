"use strict";
const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Recipe Manager',
        description: 'A web app for managing recipes'
    },
    host: 'therecipetracker.herokuapp.com',
    schemes: ['https']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.ts'];
swaggerAutogen(outputFile, endpointsFiles, doc);
