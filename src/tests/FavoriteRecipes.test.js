import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import favoriteRecipesOne from './helpers/mocks/favoriteRecipesOne';
import App from '../App';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});
describe('Testa a tela favoriteRecipes', () => {
  const favoriteRecipes = '/favorite-recipes';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Verifica se filtra por bebidas', () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [favoriteRecipes] });

    const gg = screen.getByRole('heading', {
      name: /name: gg/i,
    });

    expect(gg).toBeInTheDocument();

    const sushi = screen.getByRole('heading', {
      name: /name: sushi/i,
    });

    expect(sushi).toBeInTheDocument();

    const bigMac = screen.getByRole('heading', {
      name: /name: big mac/i,
    });

    expect(bigMac).toBeInTheDocument();

    const buttonDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    expect(buttonDrinks).toBeInTheDocument();

    userEvent.click(buttonDrinks);

    expect(gg).toBeDefined();
    expect(bigMac).not.toBeInTheDocument();
  });

  it('Verifica se filtra por comidas', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [favoriteRecipes] });

    const gg = screen.queryByRole('heading', {
      name: /name: gg/i,
    });

    expect(gg).toBeDefined();

    const sushi = screen.getByRole('heading', {
      name: /name: sushi/i,
    });

    expect(sushi).toBeInTheDocument();

    const bigMac = screen.queryByRole('heading', {
      name: /name: big mac/i,
    });

    expect(bigMac).toBeInTheDocument();

    const buttonMeals = screen.getByRole('button', {
      name: /meals/i,
    });

    expect(buttonMeals).toBeDefined();

    userEvent.click(buttonMeals);

    const g = screen.queryByRole('heading', {
      name: /name: gg/i,
    });

    expect(bigMac).toBeDefined();
    expect(sushi).toBeDefined();
    expect(g).not.toBeInTheDocument();
  });

  it('Verifica se filtra por Todos', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [favoriteRecipes] });

    const gg = screen.queryByRole('heading', {
      name: /name: gg/i,
    });

    expect(gg).toBeDefined();

    const sushi = screen.getByRole('heading', {
      name: /name: sushi/i,
    });

    expect(sushi).toBeInTheDocument();

    const bigMac = screen.queryByRole('heading', {
      name: /name: big mac/i,
    });

    expect(bigMac).toBeInTheDocument();

    const buttonMeals = screen.getByRole('button', {
      name: /meals/i,
    });

    expect(buttonMeals).toBeDefined();

    userEvent.click(buttonMeals);

    const g = screen.queryByRole('heading', {
      name: /name: gg/i,
    });

    expect(bigMac).toBeDefined();
    expect(sushi).toBeDefined();
    expect(g).not.toBeInTheDocument();

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll);

    expect(bigMac).toBeDefined();
    expect(sushi).toBeDefined();
    expect(gg).toBeDefined();
  });

  it('Verifica se copia o link na imagem', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouterAndRedux(<App />, { initialEntries: [favoriteRecipes] });

    const horizontalShare = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(horizontalShare);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/15997');

    const textCopy = screen.findByText(/Link copied!/i);

    expect(textCopy).toBeDefined();

    setTimeout(() => {
      expect(textCopy).not.toBeDefined();
    }, 3000);
  });

  it('Verifica se desfavorita', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [favoriteRecipes] });

    const gg = screen.queryByRole('heading', {
      name: /name: gg/i,
    });

    expect(gg).toBeDefined();

    const buttonDisfavor = screen.getByTestId('0-disfavor');

    userEvent.click(buttonDisfavor);
  });
});
