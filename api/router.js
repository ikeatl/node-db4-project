const express = require("express");
const helpers = require("./model");

const router = express.Router();

router.get("/recipes/:id", async (req, res, next) => {
  helpers
    .getRecipeById(req.params.id)
    .then((recipe) => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    })
    .catch(next);
});
