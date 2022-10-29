import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DrinkDetails from '../components/DrinkDetails';
import MealsDetails from '../components/MealsDetails';
import CarouselMeal from '../components/CarouselMeal';
import CarouselDrink from '../components/CarouselDrink';

function RecipeDetails({ match, history }) {
  function handleClick() {
    history.push(`${match.url}/in-progress`);
  }
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [renderButton, setRenderButton] = useState(true);
  const [renderLinkCopied, setRenderLinkCopied] = useState(false);
  // const [useRecipeDatail, setUseRecipeDatail] = useState({});

  function checkComplet(id) {
    const doneRecipes = localStorage.getItem('doneRecipes');
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

  useEffect(() => {
    const { params: { id }, path } = match;
    checkComplet(id);
    checkProgress(id, path);
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
    const { path } = match;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeDetail = JSON.parse(localStorage.getItem('recipeDatail'));
    const id = path.includes('meals') ? 'meal' : 'drink';
    console.log(id);
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
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, setStorage]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([setStorage]));
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
        data-testid="favorite-btn"
        onClick={ saveFavorite }
      >
        Favorite
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
