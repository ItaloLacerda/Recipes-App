import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { renderHeader } from '../redux/actions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes({ updateHeader, history }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [renderLinkCopied, setRenderLinkCopied] = useState(false);
  const [itsFavoriteRecipe, setitsFavoriteRecipe] = useState(false);

  useEffect(() => {
    updateHeader('Done Recipes', true, false);
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipe !== null) {
      setDoneRecipes(doneRecipe);
    }
  }, []);

  const saveFavorite = ({ id, type, nationality, category,
    alcoholicOrNot, name, image }) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const setStorage = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    if (favoriteRecipes) {
      if (itsFavoriteRecipe) {
        const newfavoriteRecipes = favoriteRecipes.filter(
          (recipe) => recipe.id !== id,
        );
        localStorage
          .setItem('favoriteRecipes', JSON.stringify([...newfavoriteRecipes]));
        setitsFavoriteRecipe(false);
      } else {
        localStorage
          .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, setStorage]));
        setitsFavoriteRecipe(true);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([setStorage]));
      setitsFavoriteRecipe(true);
    }
  };

  function filterRecipes({ target }) {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));

    if (target.name === 'meal') {
      const newDoneRecipes = doneRecipe
        .filter((recipe) => recipe.type === target.name);
      setDoneRecipes(newDoneRecipes);
    }

    if (target.name === 'drink') {
      const newFavoriteDrink = doneRecipe
        .filter((recipe) => recipe.type === target.name);
      setDoneRecipes(newFavoriteDrink);
    }

    if (target.name === 'all') {
      setDoneRecipes(doneRecipe);
    }
  }

  function copyURL(typeRecipe, idRecipe) {
    const time = 2000;
    navigator.clipboard.writeText(`http://localhost:3000/${typeRecipe}s/${idRecipe}`);
    setRenderLinkCopied(true);
    setTimeout(() => {
      setRenderLinkCopied(false);
    }, time);
  }
  return (
    <div>
      <Header history={ history } />

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
          doneRecipes.map((recipes, index) => (
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
              <p data-testid={ `${index}-horizontal-done-date` }>{ recipes.doneDate }</p>
              {
                recipes.type === 'meal' && (
                  <div>
                    <p data-testid={ `${index}-Pasta-horizontal-tag` }>
                      {recipes.tags[0]}
                    </p>
                    <p data-testid={ `${index}-Curry-horizontal-tag` }>
                      {recipes.tags[1]}
                    </p>
                  </div>

                )
              }
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
                onClick={ () => saveFavorite(recipes) }
              >
                {
                  itsFavoriteRecipe ? (
                    <img
                      type="image/svg+xml"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      alt="whiteHeart Icon"
                      src={ blackHeartIcon }
                    />
                  ) : (
                    <img
                      type="image/svg+xml"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      alt="blackHeart Icon"
                      src={ whiteHeartIcon }
                    />
                  )
                }
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

DoneRecipes.propTypes = {
  updateHeader: PropTypes.func.isRequired,
  history: PropTypes.shape({}),
};

DoneRecipes.defaultProps = {
  history: {},
};
export default connect(null, mapDispatchToProps)(DoneRecipes);
