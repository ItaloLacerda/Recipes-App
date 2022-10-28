import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { renderHeader } from '../redux/actions';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes({ updateHeader, history }) {
  useEffect(() => {
    updateHeader('Favorite Recipes', true, false);
  }, []);
  return (
    <div>
      <Header history={ history } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        <img data-testid={ `${index}-horizontal-image` } alt="recipe-img" />
        <h3 data-testid={ `${index}-horizontal-top-text` }>Category:</h3>
        <h5 data-testid={ `${index}-horizontal-name` }>Name:</h5>
        <span data-testid={ `${index}-horizontal-done-date` }>Date:</span>
        <span data-testid={ `${index}-${tagName}-horizontal-tag` }>Tags:</span>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
        >
          <img src={ blackHeartIcon } alt="favorite" />
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateHeader: (pageTitle, profileIcon, searchIcon) => (
    dispatch(renderHeader(pageTitle, profileIcon, searchIcon))),
});

FavoriteRecipes.propTypes = {
  updateHeader: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(null, mapDispatchToProps)(FavoriteRecipes);
