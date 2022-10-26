import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FoodCard extends Component {
  render() {
    const { index, src, name } = this.props;
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          alt={ name }
          src={ src }
          width="100"
          height="100"
        />
        <h5 data-testid={ `${index}-card-name` }>{ name }</h5>
      </div>
    );
  }
}

FoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FoodCard;
