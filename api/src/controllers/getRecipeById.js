const axios = require('axios')
const {Recipe} = require('../db')
const { validate: isUUID } = require('uuid');
const {Diets} = require('../db');
require('dotenv').config();
const {API_KEY_TWO} = process.env;

const apiKey =API_KEY_TWO

const getRecipe =async (req,res)=>{
  const {idRecipe} = req.params
  try {
    if(isUUID(idRecipe)){
      const recipeDb = await Recipe.findByPk(idRecipe,{include: {
        model: Diets, // Incluir el modelo Diet en la consulta
        attributes: ['name'], // Especificar qué atributos de Diet deseas incluir
        raw: true, // Indicar que solo se devuelvan datos en bruto, no objetos completos
        through: { attributes: [] } // Evitar incluir los datos de la tabla intermedia
      }})
      res.status(200).json(recipeDb)
    }
    else{
      const apiRequest = await axios(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${apiKey}&includeNutrition=true.`)
      const response = apiRequest.data
      const recipe =  {
        id: response.id,
        name: response.title,
        image: response.image,
        summary:response.summary.replace(/<[^>]+>/g, ""),
        healthScore: response.healthScore,
        stepByStep:response.instructions.replace(/<[^>]+>/g, ""),
        diets: response.diets
      }
     res.status(200).json(recipe)
    }
  } catch (error) {
    res.status(400).json({error:'no sirve', details:error.mensagge})
  }

};

  module.exports= {getRecipe}
