import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import localStorageDoneRecipes from './helpers/mocks/doneRecipes';
import App from '../App';
import favoriteRecipes from './helpers/mocks/favoriteRecipesOne';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});
describe('Testa a tela Done Recipes', () => {
  const doneRecipes = '/done-recipes';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Verifica se filtra por bebidas', () => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(localStorageDoneRecipes),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [doneRecipes] });

    const buttonDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    expect(buttonDrinks).toBeDefined();

    const nameCorba = screen.getByRole('heading', {
      name: /name: corba/i,
    });

    expect(nameCorba).toBeDefined();

    const nameA1 = screen.getByRole('heading', {
      name: /name: a1/i,
    });

    expect(nameA1).toBeDefined();

    userEvent.click(buttonDrinks);

    const Corba = screen.queryByRole('heading', {
      name: /name: corba/i,
    });

    expect(Corba).toBe(null);
  });

  it('Verifica se filtra por comidas', async () => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(localStorageDoneRecipes),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [doneRecipes] });

    const buttonMeals = screen.getByRole('button', {
      name: /meals/i,
    });

    expect(buttonMeals).toBeDefined();

    const nameCorba = screen.getByRole('heading', {
      name: /name: corba/i,
    });

    expect(nameCorba).toBeDefined();

    const nameA1 = screen.getByRole('heading', {
      name: /name: a1/i,
    });

    expect(nameA1).toBeDefined();

    userEvent.click(buttonMeals);

    const A1 = screen.queryByRole('heading', {
      name: /name: a1/i,
    });

    expect(A1).toBe(null);
  });

  it('Verifica se filtra por Todos', async () => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(localStorageDoneRecipes),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [doneRecipes] });

    const buttonMeals = screen.getByRole('button', {
      name: /meals/i,
    });

    expect(buttonMeals).toBeDefined();

    const nameCorba = screen.getByRole('heading', {
      name: /name: corba/i,
    });

    expect(nameCorba).toBeDefined();

    const nameA1 = screen.getByRole('heading', {
      name: /name: a1/i,
    });

    expect(nameA1).toBeDefined();

    userEvent.click(buttonMeals);

    const A1 = screen.queryByRole('heading', {
      name: /name: a1/i,
    });

    expect(A1).toBe(null);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(buttonAll).toBeDefined();

    userEvent.click(buttonAll);

    expect(nameA1).toBeDefined();
    expect(nameCorba).toBeDefined();
  });

  it('Verifica se copia o link ao clicar no icone de compartilha do Corba ', async () => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(localStorageDoneRecipes),
    );
    jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouterAndRedux(<App />, { initialEntries: [doneRecipes] });

    const horizontalShare = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(horizontalShare);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/53013');

    const textCopy = screen.findByText(/Link copied!/i);

    expect(textCopy).toBeDefined();

    setTimeout(() => {
      expect(textCopy).not.toBeDefined();
    }, 3000);
  });

  it('Verifica se copia o link ao clicar no icone de compartilha do A1 ', async () => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(localStorageDoneRecipes),
    );
    jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouterAndRedux(<App />, { initialEntries: [doneRecipes] });

    const horizontalShare2 = screen.getByTestId('2-horizontal-share-btn');

    userEvent.click(horizontalShare2);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/17222');

    const textCopy = screen.findByText(/Link copied!/i);

    expect(textCopy).toBeDefined();

    setTimeout(() => {
      expect(textCopy).not.toBeDefined();
    }, 10000);
  });
  it('Verifica se desfavorita', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipes),
    );
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(localStorageDoneRecipes),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [doneRecipes] });

    const gg = screen.queryByRole('heading', {
      name: /name: gg/i,
    });

    expect(gg).toBeDefined();

    const buttonDisfavor = screen.getByTestId('3-horizontal-favorite-btn');

    userEvent.click(buttonDisfavor);
  });

  it('Verifica se favorita', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipes),
    );
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(localStorageDoneRecipes),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [doneRecipes] });

    const buttonDisfavor = screen.getByTestId('2-horizontal-favorite-btn');

    userEvent.click(buttonDisfavor);
  });
});
