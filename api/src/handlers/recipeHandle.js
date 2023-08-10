const {getRecipesName} = require('../controllers/getRecipesName')
const {getAllRecipes} = require('../controllers/getAllRecipes')
const {getRecipe} = require ('../controllers/getRecipeById')

//si existe una query que traiga las recetas con esa query , si  no que traiga todas
const getRecipesHandler = async (req, res) => {
    const { name } = req.query;
    const results = name ? await getRecipesName(name) : await getAllRecipes(); 
    res.json(results);
  };
  const getRecipeByIdHandler = async(req,res) =>{
    const id = req.params;
    try {
       const recipe = await getRecipe(id)
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json(error)
    }

  }


  module.exports={getRecipesHandler,getRecipeByIdHandler}
  