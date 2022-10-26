import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa Componete Header', () => {
  const SEARCH_TOP_BTN = 'search-top-btn';

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

    userEvent.click(profileTopBtn);
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

    userEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchInput).toBeInTheDocument();
  });

  test('Testa de a barra de pesquisa realiza chamada a API', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const radioIngredient = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const radioFirstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByTestId('exec-search-btn');

    expect(searchBtn).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();

    userEvent.type(searchInput, 'lemon');
    expect(searchInput.value).toEqual('lemon');

    userEvent.click(radioIngredient);
    expect(radioIngredient.value).toEqual('on');

    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter.value).toEqual('on');

    userEvent.click(radioName);
    expect(radioName.value).toEqual('on');

    userEvent.click(searchBtn);
  });
});
