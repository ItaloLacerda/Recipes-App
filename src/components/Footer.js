import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  handleClickDrinks = () => {
    const { history } = this.props;
    history.push('/drinks');
    window.location.reload();
  };

  handleClickMeals = () => {
    const { history } = this.props;
    history.push('/meals');
    window.location.reload();
  };

  render() {
    return (
      <footer
        data-testid="footer"
        style={ {
          bottom: '0',
          left: '0',
          position: 'fixed',
        } }
      >
        <button
          type="submit"
          data-testid="button-drinks"
          onClick={ this.handleClickDrinks }
        >
          <img
            src={ drinkIcon }
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
        <button
          type="submit"
          data-testid="button-meals"
          onClick={ this.handleClickMeals }
        >
          <img
            src={ mealIcon }
            alt="meal"
            data-testid="meals-bottom-btn"
          />
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Footer);
