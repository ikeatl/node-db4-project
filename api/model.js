const db = require("../data/db-config");
const router = express.Router();
const knex = require("express");

async function getRecipeById(recipe_id) {
  const recipe = await db("recipes").where({ recipe_id }).first().select("recipe_id", "recipe_name", "created_at");
  if (!recipe) {
    return null;
  }

  const steps = await db("steps").where({ recipe_id }).orderBy("step_number").select("step_id", "step_number", "step_instructions");

  for (const step of steps) {
    const ingredients = await db("step_ingredients")
      .where({ step_id: step.step_id })
      .join("ingredients", "step_ingredients.ingredient_id", "ingredients.ingredient_id")
      .select("ingredients.ingredient_id", "ingredients.ingredient_name", "step_ingredients.quantity");
    step.ingredients = ingredients;
  }

  recipe.steps = steps;
  return recipe;
}

module.exports = {
  getRecipeById,
};
