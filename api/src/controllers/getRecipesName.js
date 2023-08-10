const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
require('dotenv').config();
const {API_KEY , API_KEY_TWO} = process.env;

const apiKey = API_KEY_TWO

const getRecipesName = async (id) => {
  // const { name } = req.query;
  const recipes = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${id}%`,
      },
    },
    include: [Diets],
  });

    if (recipes.length > 0) {
      return recipes
    } else {
      const apiRequest = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?query=${id}&includeNutrition=true&addRecipeInformation=true&apiKey=${apiKey}`
      );
      const response = apiRequest.data.results;
      const recetaGuardada = response.map((e) => {
        return {
          id: e.id,
          name: e.title,
          image: e.image,
        };
      });
      return recetaGuardada
    }

}
module.exports = { getRecipesName };
