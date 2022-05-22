/**********************
 * Main Route
 */
// const express = require('express');
import express from 'express';
const router = express.Router();

// Recipes routes
router.use('/recipes', require('./recipes'));

/**********
 * Swagger
 */
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');
import * as swaggerDocument from "../swagger.json";


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

/************
 * Export
 */
module.exports = router;
