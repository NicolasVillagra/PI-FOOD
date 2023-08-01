const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const getRecipesName = async (req, res) => {
  const { name } = req.query;
  const recipes = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [Diets],
  });
  try {
    if (recipes.length > 0) {
      res.status(200).json({ recipes });
    } else {
      const apiRequest = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=a0f51f3a58d7418fb21e10147079c2ac`
      );
      const response = apiRequest.data.results;
      const recetaGuardada = response.map((e) => {
        return {
          id: e.id,
          name: e.title,
          image: e.image,
        };
      });
      res.status(200).json({ recetaGuardada });
    }
  } catch (err) {
    res.status(500).json({ error: "Error del servidor", err });
  }
};
module.exports = { getRecipesName };
