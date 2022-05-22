'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/***************
 * Recipes routes
 */
// const express = require('express');
const express_1 = __importDefault(require('express'));
const router = express_1.default.Router();
const recipes = require('../controllers/recipes');
// Get all recipes
router.get('/', recipes.getAllRecipes);
// Get a specific recipe
router.get('/:id', recipes.getRecipe);
// Add a new recipe
router.post('/', recipes.addRecipe);
// Update a recipe
router.put('/:id', recipes.updateRecipe);
// Delete a recipe
router.delete('/:id', recipes.deleteRecipe);
module.exports = router;
