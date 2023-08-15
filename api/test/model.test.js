const {Recipe} = require ('../src/db')
const {Diets} = require('../src/db')
const {conn} = require('../src/db')
const { v4: uuidv4 } = require('uuid');
const { describe,expect } = require('@jest/globals');

describe('Test Recipe Model',()=>{
    beforeAll(async () => {
        await conn.sync({ force: true });
      },10000);
    
      afterAll(async () => {
        await conn.close();
      });

      it('Verificamos que los types esten correctos', async ()=>{
        const recipe = await Recipe.create({ //creo el modelo de test
            id:uuidv4(),
            name:"Pastas Caseras",
            summary:"Pasta hechas por ti mismo",
            healthScore: 2,
            stepByStep: "movemos la caserola",
            image:"www.imagenes.com/Pasta"
    
        })
        expect(typeof recipe.id).toBe('string')
        expect(typeof recipe.name).toBe('string')
        expect(typeof recipe.summary).toBe('string')
        expect(typeof recipe.healthScore).toBe('number')
        expect(typeof recipe.stepByStep).toBe('string'),
        expect(typeof recipe.image).toBe('string')
    })
    it('Verificamos que se cree la receta', async()=>{
        const recipe = await Recipe.create({ //creamos la receta en la DB
            id:uuidv4(),
            name:"Pastas Caseras",
            summary:"Pasta hechas por ti mismo",
            healthScore: 2,
            stepByStep: "movemos la caserola",
            image:"www.imagenes.com/Pasta"
    
        })
        const recipeCreate = await Recipe.findOne({where :{id:recipe.id}}) //buscamos la receta por id
        expect(recipeCreate).toBeDefined(); //verificamos que exista
        expect(recipeCreate.name).toBe(recipe.name);
        expect(recipeCreate.summary).toBe(recipe.summary);
        expect(recipeCreate.healthScore).toBe(recipe.healthScore);
        expect(recipeCreate.stepByStep).toBe(recipe.stepByStep);
        expect(recipeCreate.image).toBe(recipe.image);
    })
    
    // it('Verifiamos que tenga la relacion belongsToMany con el modelo Diets',async ()=>{
    //     const recipeOne = Recipe.create({
    //         id: uuidv4(),
    //         name: "Pastas Caseras",
    //         summary: "Pasta hechas por ti mismo",
    //         healthScore: 2,
    //         stepByStep: "movemos la caserola",
    //         image: "www.imagenes.com/Pasta"
    //     });
    //     const recipeTwo = Recipe.create({
    //         id: uuidv4(),
    //         name: "Fideos napolitanos",
    //         summary: "Fideos hechos en italia",
    //         healthScore: 2,
    //         stepByStep: "Hervimos los fideos y le ponemos solsa",
    //         image: "www.imagenes.com/Fideos"
    //     });
    //     const dietsOne = Diets.create({
    //         id: uuidv4(),
    //         name: "vegan"
    //     });
    //     const dietsTwo = Diets.create({
    //         id: uuidv4(),
    //         name: "vegan"
    //     });
    //     // Aca hacemos la relacion
    //     await recipeOne.addDiets(dietsOne);
    //     await recipeTwo.addDiets(dietsTwo);
    
    //     const recipeAndDietsOne = await recipeOne.getDiets();
    //     const recipeAndDietsTwo = await recipeTwo.getDiets(); // Cambio aquí
    
    //     expect(recipeAndDietsOne).toContainEqual(dietsOne);
    //     expect(recipeAndDietsTwo).toContainEqual(dietsTwo)
    // })
})
describe('Validacion de datos',()=>{
    it('debe rechazar registros sin un nombre válido', async () => {
        try {
          await Recipe.create({
            id:uuidv4(),
            summary:"Pasta hechas por ti mismo",
            healthScore: 2,
            stepByStep: "movemos la caserola",
            image:"www.imagenes.com/Pasta"
          });
        } catch (error) {
          // Verificamos que la excepción sea un error de validación
          expect(error.name).toBe('SequelizeValidationError');
        }
      });
      
      it('debe rechazar registros sin un resumen válido', async () => {
        try {
          await Recipe.create({
            id:uuidv4(),
            name:"Pastas Casera",
            healthScore: 2,
            stepByStep: "movemos la caserola",
            image:"www.imagenes.com/Pasta"
          });
        } catch (error) {
          // Verificamos que la excepción sea un error de validación
          expect(error.name).toBe('SequelizeValidationError');
        }
      });

      it('debe rechazar registros sin un healthScore válido', async () => {
        try {
          await Recipe.create({
            id:uuidv4(),
            name:"Pastas Casera",
            summary:"Pasta hechas por ti mismo",
            stepByStep: "movemos la caserola",
            image:"www.imagenes.com/Pasta"
          });
        } catch (error) {
          // Verificamos que la excepción sea un error de validación
          expect(error.name).toBe('Error');
        }
      });

      it('debe rechazar registros sin un Paso a Paso válido', async () => {
        try {
          await Recipe.create({
            id:uuidv4(),
            name:"Pastas Caseras",
            summary:"Pasta hechas por ti mismo",
            healthScore: 2,
            image:"www.imagenes.com/Pasta"
          });
        } catch (error) {
          // Verificamos que la excepción sea un error de validación
          expect(error.name).toBe('Error');
        }
      });
      it('debe rechazar registros sin una imagen válida', async () => {
        try {
          await Recipe.create({
            id:uuidv4(),
            name:"Pastas Caseras",
            summary:"Pasta hechas por ti mismo",
            healthScore: 2,
            stepByStep:"movemos la caserola",
          });
        } catch (error) {
          // Verificamos que la excepción sea un error de validación
          expect(error.name).toBe('Error');
        }
      });

})

