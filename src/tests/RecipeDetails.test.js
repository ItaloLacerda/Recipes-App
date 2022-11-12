import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import onceMeals from './helpers/mocks/onceMeals';
import onceDrink from './helpers/mocks/onceDrink';
import mockDrinks from './helpers/mocks/drinks';
import mockMeals from './helpers/mocks/meals';
import doneRecipes from './helpers/mocks/doneRecipes';
import inProgressRecipes from './helpers/mocks/inProgressRecipes';
import favoriteRecipesOne from './helpers/mocks/favoriteRecipesOne';
import App from '../App';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});
describe('Testa a tela RecipeDetails na rota "/meals/:id"', () => {
  const pathMeals = '/meals/53013';
  beforeEach(() => {
    act(() => {
      jest.spyOn(global, 'fetch').mockImplementation((URL) => Promise.resolve({
        json: () => {
          if (URL.includes('https://www.themealdb.com/api/json/v1/1/lookup.php?i=')) {
            return Promise.resolve(onceMeals);
          }

          return Promise.resolve(mockDrinks);
        },
      }));

      localStorage.setItem(
        'recipeDatail',
        JSON.stringify(onceMeals),
      );
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Teste se favorita ao clicar no icone de coração quando estiver na rota "/meals/:id"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [pathMeals] });

    const whiteheartIcon = screen.getByRole('img', {
      name: /blackheart icon/i,
    });
    expect(whiteheartIcon).toBeDefined();

    userEvent.click(whiteheartIcon);

    const blackheartIcon = screen.findByRole('img', {
      name: /whiteheart icon/i,
    });

    expect(blackheartIcon).toBeDefined();
  });

  it('Teste se favorita ao clicar no botão "share" copia o link "/meals/:id"', () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouterAndRedux(<App />, { initialEntries: [pathMeals] });

    const buttonShare = screen.getByRole('button', {
      name: /share/i,
    });
    expect(buttonShare).toBeDefined();

    userEvent.click(buttonShare);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/53013');

    const textCopy = screen.getByText(/Link copied!/i);

    expect(textCopy).toBeDefined();

    setTimeout(() => {
      expect(textCopy).not.toBeDefined();
    }, 3000);
  });

  it('Teste se o botão "start Recipe" redireciona para a rota "/meals/53013/in-progress"', async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [pathMeals] },
    );

    const buttonStartRecipe = screen.getByRole('button', {
      name: /start recipe/i,
    });
    expect(buttonStartRecipe).toBeDefined();

    userEvent.click(buttonStartRecipe);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53013/in-progress');
    });
  });

  it('Teste se não reinderiza o botão "continue recipe" na rota "/meals/:id" caso a recite esteja concluida', () => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );

    renderWithRouterAndRedux(<App />, { initialEntries: [pathMeals] });

    const buttonStartRecipe = screen.getByRole('button', {
      name: /continue recipe/i,
    });

    expect(buttonStartRecipe).toBeDefined();
  });

  it('Teste se desfavorita ao clicar no coração na rota "/meals/:id"', () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );

    renderWithRouterAndRedux(<App />, { initialEntries: [pathMeals] });

    const blackheartIcon = screen.getByRole('img', {
      name: /whiteheart icon/i,
    });

    expect(blackheartIcon).toBeDefined();

    userEvent.click(blackheartIcon);

    const whiteheartIcon = screen.findByRole('img', {
      name: /blackheart icon/i,
    });

    expect(whiteheartIcon).toBeDefined();
  });

  it('Teste se não reinderiza o botão "start Recipe" na rota "/meals/:id" caso a recite esteja concluida', () => {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(doneRecipes),
    );
    renderWithRouterAndRedux(<App />, { initialEntries: [pathMeals] });

    const buttonStartRecipe = screen.queryByRole('button', {
      name: /start recipe/i,
    });

    expect(buttonStartRecipe).toBe(null);
  });
});

describe('Testa a tela RecipeDetails na rota "/drinks/:id"', () => {
  beforeEach(() => {
    act(() => {
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(onceDrink),
      }));

      jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(mockMeals),
      }));

      localStorage.setItem(
        'recipeDatail',
        JSON.stringify(onceDrink),
      );
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Teste se favorita ao clicar no icone de coração quando estiver na rota "/drinks/:id"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/17222'] });

    const whiteheartIcon = screen.getByRole('img', {
      name: /blackheart icon/i,
    });
    expect(whiteheartIcon).toBeDefined();

    userEvent.click(whiteheartIcon);

    const blackheartIcon = screen.findByRole('img', {
      name: /whiteheart icon/i,
    });

    expect(blackheartIcon).toBeDefined();
  });
});
