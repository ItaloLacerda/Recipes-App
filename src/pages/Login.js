import React from 'react';
import PropTypes from 'prop-types';

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
      <form>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />

        <input
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
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
