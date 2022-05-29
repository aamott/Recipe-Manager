import { ObjectId } from 'mongodb';

/******************
 * Recipes Controller
 */
const mongodb = require('../db/connect');

// Get all recipes
const getAllRecipes = async (req: any, res: any) => {
  try {
    const result = await mongodb.getDb().db().collection('recipes').find();
    result.toArray().then((lists: any) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(lists));
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific recipe
const getRecipe = async (req: any, res: any) => {
  /*
    #swagger.description = "Get a single recipe by id"
  */
  try {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').find({
      _id: recipeId
    });
    result.toArray().then((lists: any[]) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add a new recipe
const addRecipe = async (req: any, res: any, _next: any) => {
  /*
    #swagger.description = "Create a new recipe. Returns the new recipe id."
  */
  //  Check required fields
  try {
    if (
      !req.body.category ||
      !req.body.tags ||
      !req.body.description ||
      !req.body.title ||
      !req.body.ingredients ||
      !req.body.instructions
    ) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: 'Missing required fields' });
      return;
    }

    //  Add recipe to database
    const newRecipe = {
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
    const result = await mongodb.getDb().db().collection('recipes').insertOne(newRecipe);

    //  Return new recipe id
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result.insertedId);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a recipe
const updateRecipe = async (req: any, res: any) => {
  /*
    #swagger.description = "Update a contact"
  */
  try {
    const recipeId = new ObjectId(req.params.id);
    //  Add recipe to database
    const update = {
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
    const result = await mongodb.getDb().db().collection('contacts').updateOne(
      {
        _id: recipeId
      },
      {
        $set: update
      }
    );
    res.setHeader('Content-Type', 'application/json');
    if (result.modifiedCount === 1) {
      res.status(200).json(result.modifiedCount);
    } else {
      res.status(500).json(result.error || 'An error occured while updating contact');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a recipe
const deleteRecipe = async ( req: any, res: any ) => {
  /*
    #swagger.description = "Delete a recipe"
  */
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').deleteOne({
      _id: userId
    });
    res.setHeader('Content-Type', 'application/json');

    if (result.deletedCount === 1) {
      res.status(200).json(result.deletedCount);
    } else {
      res.status(404).json({
        error: 'No recipe found'
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe
};
