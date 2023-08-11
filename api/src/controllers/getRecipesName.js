const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
require('dotenv').config();
const {API_KEY_THREE} = process.env;

const apiKey = API_KEY_THREE

const getRecipesName = async (id) => {
  if (typeof id !== 'string') {
    throw new Error('El parámetro debe ser un string');
  }
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
          diets: e.diets
        };
      });
      return recetaGuardada
    }

}
module.exports = { getRecipesName };
