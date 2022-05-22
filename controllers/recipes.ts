import { ObjectId } from 'mongodb';

/******************
 * Recipes Controller
 */
const mongodb = require('../db/connect');

// Get all recipes
const getAllRecipes = async (req: any, res: any) => {
  const result = await mongodb.getDb().db().collection('recipes').find();
  result.toArray().then((lists: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(lists));
  });
};

// Get a specific recipe
const getRecipe = async (req: any, res: any) => {
  /*
    #swagger.description = "Get a single recipe by id"
  */
  const recipeId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('recipes').find({
    _id: recipeId
  });
  result.toArray().then((lists: any[]) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// Add a new recipe
const addRecipe = async (req: any, res: any, _next: any) => {
  /*
    #swagger.description = "Create a new recipe. Returns the new recipe id."
  */
  //  Check required fields
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
};

// Update a recipe
const updateRecipe = async (req: any, res: any) => {
  /*
    #swagger.description = "Update a contact"
  */
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
};

// Delete a recipe
const deleteRecipe = async (
  req: any,
  res: {
    setHeader: (arg0: string, arg1: string) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error: string }): void; new (): any };
    };
  }
) => {
  /*
    #swagger.description = "Delete a recipe"
  */
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
};

module.exports = {
  getAllRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe
};
