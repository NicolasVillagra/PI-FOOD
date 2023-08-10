const axios = require('axios');
require('dotenv').config();
const {Recipe,Diets} = require('../db')
const {API_KEY_TWO} = process.env;

const apiKey = API_KEY_TWO

const getAllRecipes = async() =>{

        const request = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&includeNutrition=true&addRecipeInformation=true`)
        const response = request.data.results
        const recipe = response.map((response)=>{return{
            id: response.id,
            name: response.title,
            image: response.image,
            summary:response.summary,
            healthScore: response.healthScore,
            stepByStep:response.instructions,
            diets: response.diets
        }})
        const recipeDb = await Recipe.findAll({
            // Cambia el criterio de búsqueda según tus necesidades
            include: {
              model: Diets, // Incluir el modelo Diet en la consulta
              attributes: ['name'], // Especificar qué atributos de Diet deseas incluir
              raw: true, // Indicar que solo se devuelvan datos en bruto, no objetos completos
              through: { attributes: [] } // Evitar incluir los datos de la tabla intermedia
            }
          })

          
        const combineRecipe = [...recipe,...recipeDb]
        return combineRecipe
}
module.exports={getAllRecipes}