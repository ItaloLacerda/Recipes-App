import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailTest = 'teste@gmail.com';
const passowrdTest = '1234567';
const emailinput = 'email-input';

describe('Testa o componente <Login.js />', () => {
  it('Teste se na página contém input com data-test: email-input ', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByTestId(emailinput);

    expect(text).toBeInTheDocument();
  });
  it('Teste se na página contém Button ', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByRole('button');

    expect(text).toBeInTheDocument();
  });

  it('Teste se é possivel editar o campo email_input', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailinput);
    fireEvent.change(email, { target: { value: emailTest } });

    expect(email.value).toBe(emailTest);
  });

  it('Verifica se ao clicar em Adicionar despesa, ele direciona para rota /meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailinput);
    const senha = screen.getByTestId('password-input');

    fireEvent.change(email, { target: { value: emailTest } });
    fireEvent.change(senha, { target: { value: passowrdTest } });

    const BTN = screen.getByRole('button');
    userEvent.click(BTN);
    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals');
  });
});
