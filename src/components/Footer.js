import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import mealIcon from '../images/icones/Group.png';
import '../css/footer.css';

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
      <div className="footer">
        <footer
          data-testid="footer"
          style={ {
            bottom: '0',
            left: '0',
            position: 'fixed',
          } }
        >
          <button
            className="BTN_Footer"
            type="submit"
            data-testid="button-drinks"
            onClick={ this.handleClickDrinks }
          >
            <i className="bi bi-cup-straw" />
          </button>
          <button
            className="BTN_Footer"
            type="submit"
            data-testid="button-meals"
            onClick={ this.handleClickMeals }
          >
            <img
              src={ mealIcon }
              alt="meal"
              data-testid="meals-bottom-btn"
              width="50px"
            />
          </button>
        </footer>

      </div>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Footer);
