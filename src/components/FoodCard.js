import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/FoodCard.css';

class FoodCard extends Component {
  render() {
    const { index, src, name } = this.props;
    return (
      <div className="food_card" data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          className="img_card"
          alt={ name }
          src={ src }
        />
        <h5 className="text_card" data-testid={ `${index}-card-name` }>{ name }</h5>
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
