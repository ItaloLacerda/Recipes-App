import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa Componete Header', () => {
  test('Testa se o componente Header rendeiriza o titulo', () => {
    renderWithRouterAndRedux(<Header pageTitle="Test" renderProfileIcon renderSearchIcon />);

    const titlePage = screen.getByTestId('page-title');

    expect(titlePage).toBeInTheDocument();
  });
  test('Testa se o componente Header existe na rota "/done-recipes"', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

    expect(history.location.pathname).toBe('/done-recipes');

    setTimeout(() => {
      const titlePage = screen.getByTestId('page-title');
      const profileTopBtn = screen.getByTestId('profile-top-btn');
      const searchTopBtn = screen.getByTestId('search-top-btn');

      expect(titlePage).toBeInTheDocument();
      expect(profileTopBtn).toBeInTheDocument();
      expect(searchTopBtn).toBeInTheDocument();
    }, 3000);
  });
});
