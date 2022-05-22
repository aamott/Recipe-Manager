/***************
 * Recipes routes
 */
// const express = require('express');
import express from 'express';
const router = express.Router();
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
