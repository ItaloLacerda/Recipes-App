import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa a tela RecipeInProgress', () => {
  it('Teste se na página contém Button finalizar ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    const finish = screen.getByRole(
      'button',
      { name: /finalizar/i },
    );

    expect(finish).toBeInTheDocument();
  });

  it('Teste se na página contém Button compartilhar ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    const compartilhar = screen.getByRole(
      'button',
      { name: /compartilhar/i },
    );

    expect(compartilhar).toBeInTheDocument();
  });
});
