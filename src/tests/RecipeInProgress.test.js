import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import simulateAPICall from './helpers/simulateAPICall';
import mockMeals from './helpers/mocks/onceMeals';
import mockDrinks from './helpers/mocks/onceDrink';
import favoriteOnce from './helpers/mocks/favoriteOnce';
import favoriteRecipesOne from './helpers/mocks/favoriteRecipesOne';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});
describe('Testa a tela RecipeInProgress', () => {
  const pathDrinck = '/drinks/17222/in-progress';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Se ao clicar em todos os checkbox habilita e clicar no botão finalizar redireciona "/done-recipes"', async () => {
    simulateAPICall(mockMeals);
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/meals/53013/in-progress'],
    });

    const finishButton = screen.getByRole('button', {
      name: /finalizar/i,
    });

    expect(finishButton).toBeDefined();

    const firstIngredient = screen.findByTestId('0-ingredient');
    const secondIngredient = screen.findByTestId('1-ingredient');
    const thirdIngredient = screen.findByTestId('2-ingredient');
    const bedroomIngredient = screen.findByTestId('3-ingredient');
    const fifthIngredient = screen.findByTestId('4-ingredient');
    const sixthIngredient = screen.findByTestId('5-ingredient');
    const seventhIngredient = screen.findByTestId('6-ingredient');
    const eighthIngredient = screen.findByTestId('7-ingredient');
    const ninthIngredient = screen.findByTestId('8-ingredient');
    const tenthIngredient = screen.findByTestId('9-ingredient');
    const eleventhIngredient = screen.findByTestId('10-ingredient');
    const TwelfthIngredient = screen.findByTestId('11-ingredient');
    const ThirteenthIngredient = screen.findByTestId('12-ingredient');
    const fourteenthIngredient = screen.findByTestId('13-ingredient');

    expect(firstIngredient).toBeDefined();
    expect(secondIngredient).toBeDefined();
    expect(thirdIngredient).toBeDefined();
    expect(bedroomIngredient).toBeDefined();
    expect(fifthIngredient).toBeDefined();
    expect(sixthIngredient).toBeDefined();
    expect(seventhIngredient).toBeDefined();
    expect(eighthIngredient).toBeDefined();
    expect(ninthIngredient).toBeDefined();
    expect(tenthIngredient).toBeDefined();
    expect(eleventhIngredient).toBeDefined();
    expect(TwelfthIngredient).toBeDefined();
    expect(ThirteenthIngredient).toBeDefined();
    expect(fourteenthIngredient).toBeDefined();

    userEvent.click(await firstIngredient);
    userEvent.click(await secondIngredient);
    userEvent.click(await thirdIngredient);
    userEvent.click(await bedroomIngredient);
    userEvent.click(await fifthIngredient);
    userEvent.click(await sixthIngredient);
    userEvent.click(await seventhIngredient);
    userEvent.click(await eighthIngredient);
    userEvent.click(await ninthIngredient);
    userEvent.click(await tenthIngredient);
    userEvent.click(await eleventhIngredient);
    userEvent.click(await TwelfthIngredient);
    userEvent.click(await ThirteenthIngredient);
    userEvent.click(await fourteenthIngredient);

    userEvent.click(finishButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Se ao clicar em todos os checkbox habilita e clicar no botão finalizar redireciona "/done-recipes"', async () => {
    simulateAPICall(mockDrinks);
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: [pathDrinck],
    });

    const finishButton = screen.getByRole('button', {
      name: /finalizar/i,
    });

    expect(finishButton).toBeDefined();

    const firstIngredient = screen.findByTestId('0-ingredient');
    const secondIngredient = screen.findByTestId('1-ingredient');
    const thirdIngredient = screen.findByTestId('2-ingredient');
    const bedroomIngredient = screen.findByTestId('3-ingredient');

    expect(firstIngredient).toBeDefined();
    expect(secondIngredient).toBeDefined();
    expect(thirdIngredient).toBeDefined();
    expect(bedroomIngredient).toBeDefined();

    userEvent.click(await firstIngredient);
    userEvent.click(await secondIngredient);
    userEvent.click(await thirdIngredient);
    userEvent.click(await bedroomIngredient);

    userEvent.click(finishButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Teste o Button compartilhar ', () => {
    simulateAPICall(mockMeals);
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/meals/52977/in-progress'],
    });

    const compartilhar = screen.getByRole('button', { name: /compartilhar/i });

    expect(compartilhar).toBeInTheDocument();
    userEvent.click(compartilhar);
    const textCopy = screen.getByText(/Link copied!/i);

    expect(textCopy).toBeDefined();
  });

  it('Teste se ao clicar no botão com icone de coração favoritar a comida ', () => {
    simulateAPICall(mockMeals);
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/meals/52977/in-progress'],
    });

    const favorite = screen.getByRole('button', {
      name: /blackheart icon/i,
    });

    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const disfavor = screen.getByRole('button', {
      name: /whiteheart icon/i,
    });

    expect(disfavor).toBeInTheDocument();
  });

  it('Teste se ao clicar no botão com icone de coração desfavoritar a bebida ', () => {
    simulateAPICall(mockDrinks);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteOnce),
    );
    renderWithRouterAndRedux(<App />, {
      initialEntries: [pathDrinck],
    });

    const disfavor = screen.getByRole('button', {
      name: /whiteheart icon/i,
    });

    expect(disfavor).toBeInTheDocument();

    userEvent.click(disfavor);
    const favorite = screen.getByRole('button', {
      name: /blackheart icon/i,
    });

    expect(favorite).toBeInTheDocument();
  });

  it('Teste se ao clicar no botão com icone de coração favoritar a bebida ', () => {
    simulateAPICall(mockDrinks);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouterAndRedux(<App />, {
      initialEntries: [pathDrinck],
    });

    const favorite = screen.getByRole('button', {
      name: /blackheart icon/i,
    });

    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const disfavor = screen.getByRole('button', {
      name: /whiteheart icon/i,
    });

    expect(disfavor).toBeInTheDocument();
  });
});
