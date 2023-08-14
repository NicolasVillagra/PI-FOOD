const { Recipe, Diets } = require('../db');
const axios = require('axios');
require('dotenv').config();
const {API_KEY_THREE} = process.env;

const apiKey = API_KEY_THREE



const getDiets = async (req, res) => {


      const respuesta = await axios(`https://api.spoonacular.com/recipes/complexSearch?&number=300&addRecipeInformation=true&includeNutrition=true&apiKey=${apiKey}`);
      const dietsData = respuesta.data.results;

      // para eliminar dietas duplicadas
      const uniqueDietsSet = new Set();

      dietsData.forEach((diet) => {
        if (diet.diets) {
          diet.diets.forEach((singleDiet) => uniqueDietsSet.add(singleDiet));
        }
      });

      // Convertimos el conjunto nuevamente a un array de objetos
      const uniqueDietsArray = Array.from(uniqueDietsSet);

      // Guardamos las dietas únicas en la base de datos
      await Diets.bulkCreate(uniqueDietsArray.map((diet) => {
        return { name: diet };
      }));
    

    const updatedDiets = await Diets.findAll();
    return updatedDiets

}

module.exports = { getDiets };
