const {getRecipesName} = require('../controllers/getRecipesName')
const {getAllRecipes} = require('../controllers/getAllRecipes')
const {getRecipe} = require ('../controllers/getRecipeById')

//si existe una query que traiga las recetas con esa query , si  no que traiga todas
const getRecipesHandler = async (req, res) => {
    const { name } = req.query;
    //si le estoy pasando Query llamo a recipes name , si no me las trae a todas
    try {
      const results = name ? await getRecipesName(name) : await getAllRecipes(); 
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json(error)
    }
  };



  module.exports={getRecipesHandler}
  