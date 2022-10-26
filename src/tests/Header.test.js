// import React from 'react';
// import { act, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// import { renderWithRouterAndRedux } from './helpers/renderWith';
// import App from '../App';
// import mockDrinks from './helpers/mocks/drinks';
// import mockDrinkIngredients from './helpers/mocks/drinksByIngredient';
// import mockGinDrinks from './helpers/mocks/ginDrinks';
// import simulateAPICall from './helpers/simulateAPICall';

// describe('Testa Componete Header', () => {
//   const SEARCH_TOP_BTN = 'search-top-btn';
// beforeEach(() => {
//   jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
//     json: () => Promise.resolve(mockDrinks),
//   }));
// });

// afterEach(() => {
//   jest.resetAllMocks();
// });

// test('Testa se o componente Header existe na rota "/done-recipes"', () => {
//   const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

//   expect(history.location.pathname).toBe('/done-recipes');

//   const titlePage = screen.getByTestId('page-title');
//   const profileTopBtn = screen.getByTestId('profile-top-btn');
//   const searchTopBtn = screen.queryByTestId(SEARCH_TOP_BTN);

//   expect(titlePage).toBeInTheDocument();
//   expect(profileTopBtn).toBeInTheDocument();
//   expect(searchTopBtn).not.toBeInTheDocument();
// });

// test('Testa se ao clicar no icone de Perfil redireciona para o caminho "/profile"', () => {
//   const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

//   expect(history.location.pathname).toBe('/meals');

//   const titlePage = screen.getByRole('heading', {
//     name: /meals/i,
//   });
//   const profileTopBtn = screen.getByTestId('profile-top-btn');
//   expect(titlePage).toBeInTheDocument();
//   expect(profileTopBtn).toBeInTheDocument();

//   userEvent.click(profileTopBtn);
//   const titlePageProfile = screen.getByRole('heading', {
//     name: /profile/i,
//   });
//   expect(titlePageProfile).toBeInTheDocument();
// });

// test('Testa se ao clicar no icone de Pesquisa aparece um input de pesquisa', () => {
//   const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

//   expect(history.location.pathname).toBe('/meals');

//   const titlePage = screen.getByRole('heading', {
//     name: /meals/i,
//   });
//   const searchTopBtn = screen.getByTestId(SEARCH_TOP_BTN);
//   expect(searchTopBtn).toBeInTheDocument();
//   expect(titlePage).toBeInTheDocument();

//   userEvent.click(searchTopBtn);
//   const searchInput = screen.getByTestId(SEARCH_TOP_BTN);
//   expect(searchInput).toBeInTheDocument();
// });

// test('Testa de a barra de pesquisa realiza chamada a API ao filtra por ingredientes', async () => {

// });
// });
