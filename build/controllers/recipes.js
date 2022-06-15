"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
/******************
 * Recipes Controller
 */
const mongodb = require('../db/connect');
// Get all recipes
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mongodb.getDb().db().collection('recipes').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(lists));
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Get a specific recipe
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
      #swagger.description = "Get a single recipe by id"
    */
    try {
        const recipeId = new mongodb_1.ObjectId(req.params.id);
        const result = yield mongodb.getDb().db().collection('recipes').find({
            _id: recipeId
        });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Add a new recipe
const addRecipe = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    /*
      #swagger.description = "Create a new recipe. Returns the new recipe id."
    */
    //  Check required fields
    console.log("req: ".concat(req.oidc.user));
    try {
        if (!req.body.category ||
            !req.body.tags ||
            !req.body.description ||
            !req.body.title ||
            !req.body.ingredients ||
            !req.body.instructions) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Missing required fields' });
            return;
        }
        //  Add recipe to database
        const newRecipe = {
            ownerName: req.oidc.user.name,
            ownerId: req.oidc.user.sub,
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            servings: req.body.servings || null,
            prepTime: req.body.prepTime || null,
            cookTime: req.body.cookTime || null,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            tags: req.body.tags,
            createdDate: new Date(),
            updatedDate: new Date()
        };
        const result = yield mongodb.getDb().db().collection('recipes').insertOne(newRecipe);
        // Return new recipe id
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(result.insertedId);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Update a recipe
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
      #swagger.description = "Update a contact"
    */
    try {
        const recipeId = new mongodb_1.ObjectId(req.params.id);
        // Check that the current user is the owner of the recipe
        const recipe = yield mongodb.getDb().db().collection('recipes').find({
            _id: recipeId
        });
        recipe.toArray().then((lists) => {
            if (lists[0].ownerId !== req.oidc.user.sub) {
                res.setHeader('Content-Type', 'application/json');
                res.status(403).json({ error: 'You are not the owner of this recipe' });
                return;
            }
        });
        // Update recipe
        const update = {
            ownerName: req.oidc.user.name,
            ownerId: req.oidc.user.sub,
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            servings: req.body.servings || null,
            prepTime: req.body.prepTime || null,
            cookTime: req.body.cookTime || null,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            tags: req.body.tags,
            createdDate: new Date(),
            updatedDate: new Date()
        };
        const result = yield mongodb.getDb().db().collection('recipes').updateOne({
            _id: recipeId
        }, {
            $set: update
        });
        res.setHeader('Content-Type', 'application/json');
        if (result.modifiedCount === 1) {
            res.status(200).json(result.modifiedCount);
        }
        else {
            res.status(500).json(result.error || 'An error occured while updating contact.');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
// Delete a recipe
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
      #swagger.description = "Delete a recipe"
    */
    try {
        const recipeId = new mongodb_1.ObjectId(req.params.id);
        // Check that the current user is the owner of the recipe
        const recipe = yield mongodb.getDb().db().collection('recipes').find({
            _id: recipeId
        });
        recipe.toArray().then((lists) => {
            if (lists[0].ownerId !== req.oidc.user.sub) {
                res.setHeader('Content-Type', 'application/json');
                res.status(403).json({ error: 'You are not the owner of this recipe' });
                return;
            }
        });
        // Delete recipe
        const result = yield mongodb.getDb().db().collection('recipes').deleteOne({
            _id: recipeId
        });
        res.setHeader('Content-Type', 'application/json');
        if (result.deletedCount === 1) {
            res.status(200).json(result.deletedCount);
        }
        else {
            res.status(404).json({
                error: 'No recipe found'
            });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
module.exports = {
    getAllRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe
};
