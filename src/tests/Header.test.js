import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa Componete Header', () => {
  test('', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

    expect(history.location.pathname).toBe('/done-recipes');

    await waitFor(() => {
      const titlePage = screen.getByTestId('page-title');
      const profileTopBtn = screen.getByTestId('profile-top-btn');
      const searchTopBtn = screen.getByTestId('search-top-btn');

      expect(titlePage).toBeInTheDocument();
      expect(profileTopBtn).toBeInTheDocument();
      expect(searchTopBtn).toBeInTheDocument();
    });
  });
});
