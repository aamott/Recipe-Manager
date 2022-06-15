/***************
 * Recipes routes
 */
// const express = require('express');
import express from 'express';
// const { auth, requiresAuth } = require('express-openid-connect');
import { auth, requiresAuth } from 'express-openid-connect';
const router = express.Router();
const recipes = require('../controllers/recipes');

// Get all recipes
router.get('/', recipes.getAllRecipes);

// Get a specific recipe
router.get('/:id', recipes.getRecipe);

// Add a new recipe
router.post('/', requiresAuth(), recipes.addRecipe);

// Update a recipe
router.put('/:id', requiresAuth(), recipes.updateRecipe);

// Delete a recipe
router.delete('/:id', requiresAuth(), recipes.deleteRecipe);

module.exports = router;
