import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Footer from '../components/Footer';

describe('Testa o componente Footer.js', () => {
  it('Verifica se o componente renderiza os botões e as imagens', () => {
    const { history } = renderWithRouterAndRedux(<Footer />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');

    const buttonDrinks = screen.getByTestId('button-drinks');
    const buttonMeals = screen.getByTestId('button-meals');

    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
  });

  it('Verifica se os botões redicionam para /drinks e /meals', () => {
    const { history } = renderWithRouterAndRedux(<Footer />, { initialEntries: ['/meals'] });

    expect(history.location.pathname).toBe('/meals');

    const buttonDrinks = screen.getByTestId('button-drinks');

    userEvent.click(buttonDrinks);
    expect(history.location.pathname).toBe('/drinks');

    const buttonMeals = screen.getByTestId('button-meals');

    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');
  });
});
