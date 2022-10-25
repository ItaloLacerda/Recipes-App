import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa Componete Header', () => {
  test('Testa se o componente Header existe na rota "/done-recipes"', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

    expect(history.location.pathname).toBe('/done-recipes');

    const titlePage = screen.getByTestId('page-title');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    const searchTopBtn = screen.queryByTestId('search-top-btn');

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
    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
    expect(titlePage).toBeInTheDocument();

    userEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
