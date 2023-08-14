import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Para simular eventos de usuario
import CardsRecipe from '../src/modules/CardsRecipe/CardsRecipe'; // Ajusta la ruta según tu estructura de carpetas

describe('CardsRecipe', () => {
  it('debería renderizar correctamente los elementos iniciales', () => {
    render(<CardsRecipe />);

    // Verificar la presencia de botones
    const aToZButton = screen.getByText('Ordenar de A-Z');
    const zToAButton = screen.getByText('Ordenar de Z-A');
    const dbButton = screen.getByText('DataBase');
    const apiButton = screen.getByText('API');

    // Verificar la presencia de etiquetas y selección
    const filterLabel = screen.getByLabelText('filtrar por tipo de dieta');
    const selectElement = screen.getByRole('combobox', { name: 'filtrar por tipo de dieta' });

    // Asegurarse de que los elementos estén presentes en el DOM
    expect(aToZButton).toBeInTheDocument();
    expect(zToAButton).toBeInTheDocument();
    expect(dbButton).toBeInTheDocument();
    expect(apiButton).toBeInTheDocument();
    expect(filterLabel).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
  });

  // Aquí puedes agregar más pruebas para probar otras interacciones y elementos
});