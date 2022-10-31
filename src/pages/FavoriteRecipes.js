import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { renderHeader } from '../redux/actions';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes({ updateHeader, history }) {
  const [favorites, setFavorites] = useState([]);
  const [renderLinkCopied, setRenderLinkCopied] = useState(false);

  useEffect(() => {
    updateHeader('Favorite Recipes', true, false);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoriteRecipes);
  }, []);

  function disfavor(id) {
    const newFavorites = favorites.filter((recipe) => recipe.id !== id);
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([...newFavorites]));
    setFavorites(newFavorites);
  }

  function copyURL(typeRecipe, idRecipe) {
    const time = 2000;
    navigator.clipboard.writeText(`http://localhost:3000/${typeRecipe}s/${idRecipe}`);
    setRenderLinkCopied(true);
    setTimeout(() => {
      setRenderLinkCopied(false);
    }, time);
  }

  function filterRecipes({ target }) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (target.name === 'meal') {
      const newFavoriteMeal = favoriteRecipes
        .filter((recipe) => recipe.type === target.name);
      setFavorites(newFavoriteMeal);
    }

    if (target.name === 'drink') {
      const newFavoriteDrink = favoriteRecipes
        .filter((recipe) => recipe.type === target.name);
      setFavorites(newFavoriteDrink);
    }

    if (target.name === 'all') {
      setFavorites(favoriteRecipes);
    }
  }

  return (
    <div>
      <Header history={ history } />
      {
        console.log(favorites)
      }
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ filterRecipes }
      >
        All
      </button>
      <button
        type="button"
        name="meal"
        data-testid="filter-by-meal-btn"
        onClick={ filterRecipes }
      >
        Meals
      </button>
      <button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ filterRecipes }
      >
        Drinks
      </button>
      <div>
        {
          favorites.map((recipes, index) => (
            <div key={ `${recipes}${index}` }>
              <Link to={ `/${recipes.type}s/${recipes.id}` }>
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
                </h5>
              </Link>
              <div data-testid={ `${index}-horizontal-top-text` }>
                <h3>
                  {
                    `${recipes.nationality} - ${recipes.category}`
                  }
                  {
                    recipes.type === 'drink' && (
                      <p>
                        {
                          recipes.alcoholicOrNot
                        }
                      </p>
                    )
                  }
                </h3>
              </div>
              {
                renderLinkCopied && <p>Link copied!</p>
              }
              <button
                type="button"
                onClick={ () => copyURL(recipes.type, recipes.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share"
                />
              </button>
              <button
                type="button"
                onClick={ () => disfavor(recipes.id) }
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
