const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;

const getAllRecipes = async() =>{

        const request = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&includeNutrition=true&addRecipeInformation=true`)
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
        return recipe
}
module.exports={getAllRecipes}