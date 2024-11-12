exports.seed = async function (knex, Promise) {
  return await knex("recipes").insert([{ recipe_name: "Spaghetti Bolognese" }, { recipe_name: "Pancakes" }]);
};
