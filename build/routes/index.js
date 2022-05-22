"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**********************
 * Main Route
 */
// const express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Recipes routes
router.use('/recipes', require('./recipes'));
/**********
 * Swagger
 */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
/************
 * Export
 */
module.exports = router;
