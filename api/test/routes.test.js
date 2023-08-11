const { getRecipesName} = require ('../src/controllers/getRecipesName')
const axios = require('axios');
jest.mock('axios');

describe('Función getRecipesName', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería obtener recetas de la base de datos si están disponibles', async () => {
    // Simula que Recipe.findAll devuelve algunos datos
    const mockFindAll = jest.fn(() => Promise.resolve([{ name: 'Receta 1' }, { name: 'Receta 2' }]));
    const mockInclude = jest.fn(() => ({ findAll: mockFindAll }));
    jest.mock('../src/db', () => ({ Recipe: { findAll: mockFindAll }, Diets: { include: mockInclude } }));

    const resultado = await getRecipesName('Pollo');

    expect(resultado).toEqual([{ name: 'Receta 1' }, { name: 'Receta 2' }]);
    expect(mockFindAll).toHaveBeenCalledWith({
      where: {
        name: {
          [Op.iLike]: '%Pollo%',
        },
      },
      include: [mockInclude()],
    });
  });

  it('debería obtener recetas de la API si no están disponibles en la base de datos', async () => {
    const mockApiRequest = {
      data: {
        results: [
          { id: 1, title: 'Receta A', image: 'url-imagen-a', diets: ['Dieta A'] },
          { id: 2, title: 'Receta B', image: 'url-imagen-b', diets: ['Dieta B'] },
        ],
      },
    };
    axios.mockResolvedValue(mockApiRequest);

    const resultado = await getRecipesName('Pollo');

    expect(resultado).toEqual([
      { id: 1, name: 'Receta A', image: 'url-imagen-a', diets: ['Dieta A'] },
      { id: 2, name: 'Receta B', image: 'url-imagen-b', diets: ['Dieta B'] },
    ]);
    expect(axios).toHaveBeenCalledWith({
      url: `https://api.spoonacular.com/recipes/complexSearch?query=Pollo&includeNutrition=true&addRecipeInformation=true&apiKey=c0eb492754d24d8789d41e6765fec6fb`,
      method: 'GET',
    });
  });

  it('debería lanzar un error para una entrada no válida', async () => {
    await expect(getRecipesName(123)).rejects.toThrow('El parámetro debe ser un string');
  });
});