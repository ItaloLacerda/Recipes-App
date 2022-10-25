import React from 'react';

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

  render() {
    const { email, password } = this.state;
    return (
      <form
        onSubmit={ this.handleSubmit }
      >
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
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
