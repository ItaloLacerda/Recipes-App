import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { renderHeader } from '../redux/actions';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes({ updateHeader, history }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    updateHeader('Favorite Recipes', true, false);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoriteRecipes);
  }, []);
  return (
    <div>
      <Header history={ history } />
      {
        console.log(favorites)
      }
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
        {
          favorites.map((recipes, index) => (
            <div key={ `${recipes}${index}` }>
              <img
                src={ recipes.image }
                data-testid={ `${index}-horizontal-image` }
                alt="recipe-img"
                width="100px"
              />
              <h5 data-testid={ `${index}-horizontal-name` }>
                {
                  `Name: ${recipes.name}`
                }
                <h3 data-testid={ `${index}-horizontal-top-text` }>
                  {
                    `${recipes.nationality} - ${recipes.category}`
                  }
                </h3>
              </h5>
              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share"
                />
              </button>
              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="favorite"
                />
              </button>
            </div>
          ))
        }
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
  history: PropTypes.shape().isRequired,
};

export default connect(null, mapDispatchToProps)(FavoriteRecipes);
