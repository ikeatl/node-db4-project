exports.seed = function (knex, Promise) {
  return knex("step_ingredients").insert([
    { step_id: 2, ingredient_id: 1, quantity: 1 }, // olive oil for spaghetti step 2
    { step_id: 3, ingredient_id: 2, quantity: 0.5 }, // flour for pancake step 1
    { step_id: 3, ingredient_id: 3, quantity: 2 }, // eggs for pancake step 1
    { step_id: 3, ingredient_id: 4, quantity: 1 }, // milk for pancake step 1
  ]);
};
