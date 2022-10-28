import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DrinkDetails from '../components/DrinkDetails';
import MealsDetails from '../components/MealsDetails';
import CarouselMeal from '../components/CarouselMeal';
import CarouselDrink from '../components/CarouselDrink';

function RecipeDetails({ match, history }) {
  // console.log(match)

  function handleClick() {
    history.push(`${match.url}/in-progress`);
  }
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [renderButton, setRenderButton] = useState(true);

  useEffect(() => {
    const { params: { id } } = match;
    // console.log(id)
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      doneRecipes.forEach((recipe) => {
        if (recipe.id === id) {
          setRenderButton(false);
        }
      });
    }
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
  }).isRequired,
};

export default RecipeDetails;
