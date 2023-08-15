const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {getRecipe} = require('../controllers/getRecipeById')
const {postRecipe} = require('../controllers/postRecipes')
const {getAllRecipes} = require('../controllers/getAllRecipes')
const {getRecipesHandler} = require('../handlers/recipeHandle')
const {allDiets} = require ('../handlers/dietsHandler');
const { deleteRecipe } = require('../controllers/deleteRecipe ');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/:idRecipe',getRecipe)
router.get('/recipes', getRecipesHandler);
// Ruta para crear una nueva receta y asociarla con dietas
router.post('/recipes', postRecipe);
  
// Ruta para obtener todos los tipos de dietas
router.get('/diets',allDiets);
router.get('/getAllRecipes',getAllRecipes)
router.delete('/recipes/:idDelete',deleteRecipe)


module.exports = router;
