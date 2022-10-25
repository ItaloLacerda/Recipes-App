// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
// import Header from '../components/Header';
// import { renderWithRouterAndRedux } from './helpers/renderWith';

// describe('Testa Componete Header', () => {
//   test('Testa se o componente Header rendeiriza o titulo', () => {
//     renderWithRouterAndRedux(<Header pageTitle="Test" renderProfileIcon renderSearchIcon />);

//     const titlePage = screen.getByTestId('page-title');

//     expect(titlePage).toBeInTheDocument();
//   });
//   test('Testa se o componente Header existe na rota "/done-recipes"', async () => {
//     const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

//     expect(history.location.pathname).toBe('/done-recipes');

//     setTimeout(() => {
//       const titlePage = screen.getByTestId('page-title');
//       const profileTopBtn = screen.getByTestId('profile-top-btn');
//       const searchTopBtn = screen.getByTestId('search-top-btn');

//       expect(titlePage).toBeInTheDocument();
//       expect(profileTopBtn).toBeInTheDocument();
//       expect(searchTopBtn).toBeInTheDocument();
//     }, 3000);
//   });

//   test('Testa se ao clicar no icone de Perfil redireciona para o caminho "/profile"', async () => {
//     const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

//     expect(history.location.pathname).toBe('/meals');

//     setTimeout(async () => {
//       let titlePage = screen.getByRole('heading', {
//         name: /meals/i,
//       });
//       const profileTopBtn = screen.getByTestId('profile-top-btn');
//       expect(titlePage).toBeInTheDocument();
//       expect(profileTopBtn).toBeInTheDocument();

//       userEvent.click(profileTopBtn);
//       titlePage = screen.getByRole('heading', {
//         name: /profi/i,
//       });
//       console.log(titlePage);
//       expect(titlePage).toBeInTheDocument();
//     }, 3000);
//   });
// });
