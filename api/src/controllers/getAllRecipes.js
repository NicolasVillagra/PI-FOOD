const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;

const getAllRecipes = async() =>{

        const request = await axios('https://api.spoonacular.com/recipes/complexSearch?apiKey=a0f51f3a58d7418fb21e10147079c2ac&addRecipeInformation=true')
        const response = request.data.results
        const recipe = response.map((response)=>{return{
            id: response.id,
            name: response.title,
            image: response.image,
            summary:response.summary.replace(/<[^>]+>/g, ""),
            healthScore: response.healthScore,
            stepByStep:response.steps,
            diets: response.diets
        }})
        return recipe
}
module.exports={getAllRecipes}