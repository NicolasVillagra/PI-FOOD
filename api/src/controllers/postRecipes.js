const {Recipe,Diets} = require('../db')
const postRecipe = async (req, res) => {
    try {
      const { id, name, summary, healthCore, stepByStep, diets } = req.body;
  
      // Crea la receta en la base de datos
      const recipe = await Recipe.create({ id, name, summary, healthCore, stepByStep });
  
      // Buscar o crear los tipos de dieta y relacionarlos con la receta
      for (const tipoDietaNombre of diets) {
        let tipoDieta = await Diets.findOne({ where: { name: tipoDietaNombre } });
        if (!tipoDieta) {
          tipoDieta = await Diets.create({ name: tipoDietaNombre });
        }
        await recipe.addDiets(tipoDieta);
      }
  
  
      res.status(201).json(recipe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
  module.exports ={postRecipe}
//   async (req, res) => {
//     try {
//       const { id,name,summary,healthCore,stepByStep,diets } = req.body;
  
//       // Primero, crea la receta
//       const recipe = await Recipe.create({ id,name,summary,healthCore,stepByStep });
  
//        //Si se proporcionan dietas, asocia la receta con cada dieta
//        if (diets && diets.length > 0) {
//          const dietInstances = await Diets.findAll({
//            where: {
//              name: {
//                [Op.in]: Diets,
//             },
//            },
//          });
//         await recipe.addDiets(dietInstances);
//        }
  
//       res.status(201).json(recipe);
//     } catch (err) {
//       res.status(500).json({ error: 'Error del servidor',err });
//     }
//   }