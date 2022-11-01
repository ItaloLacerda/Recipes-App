import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DrinkDetails from '../components/DrinkDetails';
import MealsDetails from '../components/MealsDetails';
import CarouselMeal from '../components/CarouselMeal';
import CarouselDrink from '../components/CarouselDrink';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails({ match, history }) {
  function handleClick() {
    history.push(`${match.url}/in-progress`);
  }
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [renderButton, setRenderButton] = useState(true);
  const [renderLinkCopied, setRenderLinkCopied] = useState(false);
  const [itsFavoriteRecipe, setitsFavoriteRecipe] = useState(false);

  function checkComplet(id) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
<<<<<<< HEAD
    console.log(doneRecipes);
=======
>>>>>>> main-group-22
    if (doneRecipes) {
      doneRecipes.forEach((recipe) => {
        if (recipe.id === id) {
          setRenderButton(false);
        }
      });
    }
  }

  function checkProgress(id, path) {
    let currentPath = '';
    if (path.includes('meals')) {
      currentPath = 'meals';
    } else {
      currentPath = 'drinks';
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const recipesId = Object.keys(inProgressRecipes[currentPath]);
      recipesId.forEach((recipe) => {
        if (recipe === id) {
          setButtonName('Continue Recipe');
        }
      });
    }
  }

  const isFavorite = (ID) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      favoriteRecipes.forEach((recipe) => {
        console.log(recipe);
        if (recipe.id === ID) {
          setitsFavoriteRecipe(true);
        }
      });
    }
  };

  useEffect(() => {
    const { params: { id }, path } = match;
    checkComplet(id);
    checkProgress(id, path);
    isFavorite(id);
  }, []);

  function copyURL() {
    const time = 2000;
    navigator.clipboard.writeText(`http://localhost:3000${match.url}`);
    setRenderLinkCopied(true);
    setTimeout(() => {
      setRenderLinkCopied(false);
    }, time);
  }
  // [{ id, type, nationality, category, alcoholicOrNot, name, image }]
  const saveFavorite = () => {
    const { params: { id }, path } = match;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeDetail = JSON.parse(localStorage.getItem('recipeDatail'));
    const setStorage = {
      id: path.includes('meals') ? recipeDetail.idMeal : recipeDetail.idDrink,
      type: path.includes('meals') ? 'meal' : 'drink',
      nationality: path.includes('meals') ? recipeDetail.strArea : '',
      category: recipeDetail.strCategory,
      alcoholicOrNot: path.includes('meals') ? '' : recipeDetail.strAlcoholic,
      name: path.includes('meals') ? recipeDetail.strMeal : recipeDetail.strDrink,
      image: path.includes('meals')
        ? recipeDetail.strMealThumb : recipeDetail.strDrinkThumb,
    };
    if (favoriteRecipes) {
      if (itsFavoriteRecipe) {
        const newfavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
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

  return (
    <>
      {
        match.url.includes('/drinks')
          ? <DrinkDetails match={ match } /> : <MealsDetails match={ match } />
      }
      {
        renderLinkCopied && <p>Link copied!</p>
      }
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyURL }
      >
        share
      </button>
      <button
        type="button"
        onClick={ saveFavorite }
      >
        {
          itsFavoriteRecipe ? (
            <img
              type="image/svg+xml"
              data-testid="favorite-btn"
              alt="whiteHeart Icon"
              src={ blackHeartIcon }
            />
          ) : (
            <img
              type="image/svg+xml"
              data-testid="favorite-btn"
              alt="blackHeart Icon"
              src={ whiteHeartIcon }
            />
          )
        }
      </button>
      {
        match.url.includes('/meals')
          ? <CarouselMeal match={ match } /> : <CarouselDrink match={ match } />
      }

      {
        renderButton && (
          <button
            type="button"
            style={ { position: 'fixed', bottom: '0px' } }
            data-testid="start-recipe-btn"
            onClick={ handleClick }
          >
            {buttonName}
          </button>
        )
      }
    </>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
