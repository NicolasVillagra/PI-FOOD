const axios = require('axios')
const {Recipe} = require('../db')
const { validate: isUUID } = require('uuid');
require('dotenv').config();
const {API_KEY} = process.env;

const getRecipe =async (req,res)=>{
  const {idRecipe} = req.params
  try {
    if(isUUID(idRecipe)){
      const recipeDb = await Recipe.findByPk(idRecipe)
      res.status(200).json(recipeDb)
    }
    else{
      const apiRequest = await axios(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&includeNutrition=true.`)
      const response = apiRequest.data
      const recetaGuardada =  {
        id: response.id,
        name: response.title,
        image: response.image,
        summary:response.summary.replace(/<[^>]+>/g, ""),
        healthScore: response.healthScore,
        stepByStep:response.steps,
        diets: response.diets
      }
     res.status(200).json({msg:'todo funca', recetaGuardada})
    }
  } catch (error) {
    res.status(500).json({error:'no sirve', error})
  }

};

  module.exports= {getRecipe}
