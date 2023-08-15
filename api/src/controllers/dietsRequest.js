const { Recipe, Diets } = require('../db');
const axios = require('axios');
require('dotenv').config();
const {API_KEY_THREE} = process.env;

const apiKey = API_KEY_THREE



const getDiets = async (req, res) => {

      //hago peticion tuki  
      const respuesta = await axios(`https://api.spoonacular.com/recipes/complexSearch?&number=300&addRecipeInformation=true&includeNutrition=true&apiKey=${apiKey}`);
      const dietsData = respuesta.data.results;


      // para eliminar dietas duplicadas
      const uniqueDietsSet = new Set();

      //hago un foreach al array de las dietas
      dietsData.forEach((diet) => {
        if (diet.diets) {
          diet.diets.forEach((singleDiet) => uniqueDietsSet.add(singleDiet)); //elimino las repetidas
        }
      });

      // Convertimos el conjunto nuevamente a un array de objetos
      const uniqueDietsArray = Array.from(uniqueDietsSet);

      // Guardamos las dietas  en la base de datos
      await Diets.bulkCreate(uniqueDietsArray.map((diet) => {
        return { name: diet };
      }));
    
      //las buscamos de nuevo
    const updatedDiets = await Diets.findAll();
    return updatedDiets

}

module.exports = { getDiets };
