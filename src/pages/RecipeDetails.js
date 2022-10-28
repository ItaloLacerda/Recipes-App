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
    // console.log(match);
    checkComplet(id);
    checkProgress(id, path);
  }, []);

  return (
    <>
      {
        match.url.includes('/drinks')
          ? <DrinkDetails match={ match } /> : <MealsDetails match={ match } />
      }
      {
        match.url.includes('/meals')
          ? <CarouselMeal match={ match } /> : <CarouselDrink match={ match } />
      }

      <button
        type="button"
        data-testid="share-btn"
      >
        share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>

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
