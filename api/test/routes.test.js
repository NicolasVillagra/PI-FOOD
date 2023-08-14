const request = require('supertest');
const app = require('../src/app'); // Importa tu aplicación Express
const { describe, test, expect } = require('@jest/globals');
const router = require('../src/routes/index')

describe('Pruebas para las rutas en rutas/index.js',() => {
  test('GET /recipes debería devolver un código de estado 200 y un objeto JSON', async () => {
    const response = await request(app).get('/recipes');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
  test('el manejador GET debería recibir un string y una función', () => {
    const route = router.stack.find(r => r.route && r.route.path === '/recipes'); //busca si tiene la funcion
    
    expect(route).toBeDefined(); // que no sea null
    expect(route.route.methods.get).toBe(true); // verifica el metodo get
    expect(typeof route.route.stack[0].handle).toBe('function'); // Verifica si el manejador es una función
    expect(route.route.stack[0].name).toBe('getRecipesHandler'); // Verifica si el manejador tiene el nombre correcto
  });
  test('POST /recipes debería devolver un código de estado 200 y un objeto JSON', async () => {
    const postData = {
        id: 'valid-uuid', // Un UUID válido
        name: 'Receta de prueba',
        summary: 'Esta es una receta de prueba.',
        healthScore: 90,
        image: 'imagen.jpg',
        stepByStep: 'Siga estos pasos para preparar la receta...',
        diets: ['Dieta 1', 'Dieta 2']
      };

      const response = await request(app).post('/recipes').send(postData)
      expect(response.status).toBe(201); // Verifica el código de estado esperado
      expect(response.body.id).toBeDefined(); // Verifica que se haya generado un UUID si no se proporcionó uno
      expect(response.body.name).toBe(postData.name);
  });
});