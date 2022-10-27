import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import simulateAPICall from './helpers/simulateAPICall';

describe('Testa Componete Header', () => {
  const SEARCH_TOP_BTN = 'search-top-btn';

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Testa se exibe um alerte ao pesquisar uma receita que não existe', async () => {
    act(() => {
      window.alert = jest.fn();
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    expect(history.location.pathname).toBe('/drinks');

    const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');

    const radioName = screen.getByRole('radio', {
      name: /name/i,
    });
    const searchBtn = screen.getByTestId('exec-search-btn');

    act(() => {
      userEvent.type(searchInput, 'xablau');
      userEvent.click(radioName);
    });

    expect(searchInput.value).toEqual('xablau');
    expect(radioName.value).toEqual('on');

    userEvent.click(searchBtn);
    act(() => {
      simulateAPICall({ drinks: null });
    });

    await waitFor(() => {
      expect(window.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
});
