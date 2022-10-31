import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockDrinks from './helpers/mocks/drinks';
import mockDrinkIngredients from './helpers/mocks/drinksByIngredient';
import onceDrinck from './helpers/mocks/onceDrink';
import onceMeals from './helpers/mocks/onceMeals';
import mockGinDrinks from './helpers/mocks/ginDrinks';
import simulateAPICall from './helpers/simulateAPICall';

describe('Testa Componete Header', () => {
  const SEARCH_TOP_BTN = 'search-top-btn';
  const SEARCH_INPUT = 'search-input';
  const EXEC_SEARCH_BTN = 'exec-search-btn';

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Testa se o componente Header existe na rota "/done-recipes"', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

    expect(history.location.pathname).toBe('/done-recipes');

    const titlePage = screen.getByTestId('page-title');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const searchTopBtn = screen.queryByTestId(SEARCH_TOP_BTN);

    expect(titlePage).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  test('Testa se ao clicar no icone de Perfil redireciona para o caminho "/profile"', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');

    const titlePage = screen.getByRole('heading', {
      name: /meals/i,
    });
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(titlePage).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(profileTopBtn);
    });
    const titlePageProfile = screen.getByRole('heading', {
      name: /profile/i,
    });
    expect(titlePageProfile).toBeInTheDocument();
  });

  test('Testa se ao clicar no icone de Pesquisa aparece um input de pesquisa', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');

    const titlePage = screen.getByRole('heading', {
      name: /meals/i,
    });
    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchTopBtn).toBeInTheDocument();
    expect(titlePage).toBeInTheDocument();

    act(() => {
      userEvent.click(searchTopBtn);
    });
    const searchInput = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchInput).toBeInTheDocument();
  });

  test('Testa de a barra de pesquisa realiza chamada a API ao filtra por ingredientes', () => {
    act(() => {
      simulateAPICall(mockDrinks);
    });
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioIngredient = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    expect(searchBtn).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();

    userEvent.type(searchInput, 'lemon');
    expect(searchInput.value).toEqual('lemon');

    userEvent.click(radioIngredient);
    expect(radioIngredient.value).toEqual('on');

    userEvent.click(searchBtn);

    act(() => {
      simulateAPICall(mockDrinkIngredients);
    });
    expect(fetch).toBeCalledTimes(3);
  });

  test('Testa de a barra de pesquisa realiza chamada a API ao filtra por nome', () => {
    act(() => {
      simulateAPICall(mockDrinks);
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(searchInput, 'gin');
      userEvent.click(radioName);
    });

    expect(searchInput.value).toEqual('gin');
    expect(radioName.value).toEqual('on');

    act(() => {
      userEvent.click(searchBtn);
      simulateAPICall(mockGinDrinks);
    });
    expect(fetch).toBeCalledTimes(3);
  });

  test('Testa de a barra de pesquisa realiza chamada a API ao filtra pela primeira letra', () => {
    act(() => {
      simulateAPICall(mockDrinks);
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    const radioFirstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(searchInput, 'g');
      userEvent.click(radioFirstLetter);
    });

    expect(searchInput.value).toEqual('g');
    expect(radioFirstLetter.value).toEqual('on');

    act(() => {
      userEvent.click(searchBtn);
      simulateAPICall(mockGinDrinks);
    });
    expect(fetch).toBeCalledTimes(3);
  });

  test('Testa se exibe um alert caso o filtra pela primeira letra e incluir mais de uma letra no input', () => {
    act(() => {
      simulateAPICall(mockDrinks);
      window.alert = jest.fn();
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    const radioFirstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(searchInput, 'ge');
      userEvent.click(radioFirstLetter);
    });

    expect(searchInput.value).toEqual('ge');
    expect(radioFirstLetter.value).toEqual('on');

    act(() => {
      userEvent.click(searchBtn);
    });
    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  test('Testa se redireciona para pagina de detalhes da receita quado a API retorna apenas uma receita de drinck', async () => {
    act(() => {
      simulateAPICall(onceDrinck);
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(searchInput, 'A1');
      userEvent.click(radioName);
    });

    expect(searchInput.value).toEqual('A1');
    expect(radioName.value).toEqual('on');

    act(() => {
      userEvent.click(searchBtn);
      simulateAPICall(onceDrinck);
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/17222');
    });
  });

  test('Testa se redireciona para pagina de detalhes da receita quado a API retorna apenas uma receita de comida', async () => {
    act(() => {
      simulateAPICall(onceMeals);
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(SEARCH_INPUT);

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByTestId(EXEC_SEARCH_BTN);

    act(() => {
      userEvent.type(searchInput, 'Big Mac');
      userEvent.click(radioName);
    });

    expect(searchInput.value).toEqual('Big Mac');
    expect(radioName.value).toEqual('on');

    act(() => {
      userEvent.click(searchBtn);
      simulateAPICall(onceMeals);
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53013');
    });
  });
});
