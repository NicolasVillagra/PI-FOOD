const {Recipe,Diets} = require('../db')
const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const getDiets =async (req, res) => {
    try {
       // Verifica si existen dietas en la base de datos
       const diets = await Diets.findAll();
  
    //   // Si no se encuentran dietas, obténlas de la API y guárdalas en la base de datos
       if (diets.length === 0) {
         const respuesta = await axios(`https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&apiKey=${API_KEY}`);
        const dietsData = respuesta.data.results;
        await Diets.bulkCreate(dietsData.map((diet) => {
          return{name: diet.diets} }));
       }
  
       const updatedDiets = await Diets.findAll();
       res.status(200).json({updatedDiets})
    // res.status(200).json({msg:'esta funcando',dietsMap})
    } catch (err) {
      res.status(500).json({ error: 'Error del servidor',err });
    }
  }
  module.exports={getDiets}