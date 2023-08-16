const {Recipe,Diets} = require('../db')
const uuid = require('uuid');
const postRecipe = async (req, res) => {
  try {
    const { id, name, summary, healthScore,image, stepByStep, diets } = req.body;

    // Verifico si el ID es un UUID
    let recipeId = id;
    const isUUID = uuid.validate(id);
    if (!isUUID) {
      recipeId = uuid.v4(); // Genero un nuevo UUID
    }

    // Creo la receta
    const recipe = await Recipe.create({ id: recipeId, name, summary,image, healthScore, stepByStep });

    // lo asocio con una receta
    const dietTypeInstances = await Promise.all(
      diets.map(async dietTypeName => { 
        let dietType = await Diets.findOne({ where: { name: dietTypeName } });
        if (!dietType) { //si no se encuentra la dieta se crea una
          dietType = await Diets.create({ name: dietTypeName });
        }
        return dietType;
      })
    );

    await recipe.setDiets(dietTypeInstances); //se relaciona la dieta con la receta
    res.status(201).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error intero del servidor', err });
  }
};
  module.exports ={postRecipe}
