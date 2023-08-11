const {Recipe} = require('../db')

const deleteRecipe =async (req, res) => {
    try {
      const {idDelete} = req.params;
      const recipe = await Recipe.findByPk(idDelete);
  
      await recipe.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  
  module.exports = {deleteRecipe}