"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/***************
 * Recipes routes
 */
// const express = require('express');
const express_1 = __importDefault(require("express"));
// const { auth, requiresAuth } = require('express-openid-connect');
const express_openid_connect_1 = require("express-openid-connect");
const router = express_1.default.Router();
const recipes = require('../controllers/recipes');
// Get all recipes
router.get('/', recipes.getAllRecipes);
// Get a specific recipe
router.get('/:id', recipes.getRecipe);
// Add a new recipe
router.post('/', (0, express_openid_connect_1.requiresAuth)(), recipes.addRecipe);
// Update a recipe
router.put('/:id', (0, express_openid_connect_1.requiresAuth)(), recipes.updateRecipe);
// Delete a recipe
router.delete('/:id', (0, express_openid_connect_1.requiresAuth)(), recipes.deleteRecipe);
module.exports = router;
