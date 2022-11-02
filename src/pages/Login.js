import React from 'react';
import PropTypes from 'prop-types';
import '../css/login.css';
import logo from '../images/imagens/comida.png';

const num = 6;

const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  );

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history } = this.props;

    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <div className="titulo">
          <h1>
            Good things

          </h1>
          <h1>
            await.

          </h1>
          <img
            className="imagem"
            src={ logo }
            alt={ logo }
          />
        </div>
        <form className="form_login">
          <input
            placeholder="Email"
            className="input_login"
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />

          <input
            placeholder="Password"
            className="input_login"
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-btn"
            className="BTN_login"
            type="submit"
            disabled={ password.length <= num || !validateEmail(email) }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
