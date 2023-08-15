import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import CardsRecipe from '../src/modules/CardsRecipe/CardsRecipe'; // Ajusta la ruta según tu estructura de carpetas
import { Provider } from 'react-redux'
import store from '../src/redux/store'

describe('CardsRecipe', () => {
  test('se renderizar correctamente los elementos iniciales', () => {
    render(
    <Provider store={store}>
    <CardsRecipe />
    </Provider>);

    //Se renderizan bien los botones
    const orderAz = screen.getByText('Ordenar de A-Z'); //uso Screen para acceder a los elementos 
    const orderZa = screen.getByText('Ordenar de Z-A');
    const filterApi = screen.getByText('API');
    const filterDb = screen.getByText('DataBase')
    const labelDiets = screen.getAllByLabelText('filtrar por tipo de dieta')
    const selectElement = screen.getByRole('combobox', { name: 'filtrar por tipo de dieta' });

    expect(orderAz).toBeInTheDocument();
    expect(orderZa).toBeInTheDocument();
    expect(filterApi).toBeInTheDocument();
    expect(filterDb).toBeInTheDocument()
    labelDiets.forEach((labelDiet) => { //como son multiples elementos hago un for each
      expect(labelDiet).toBeInTheDocument();
    });
    
    expect(selectElement).toBeInTheDocument()
  });
});