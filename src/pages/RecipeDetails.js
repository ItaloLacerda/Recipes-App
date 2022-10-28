import React from 'react';
import PropTypes from 'prop-types';

import DrinkDetails from '../components/DrinkDetails';
import MealsDetails from '../components/MealsDetails';
import CarouselMeal from '../components/CarouselMeal';
import CarouselDrink from '../components/CarouselDrink';

function RecipeDetails({ match, history }) {
  function handleClick() {
    history.push(`${match.url}/in-progress`);
  }

  const nameButton = 'Start Recipe';

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
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {nameButton}
      </button>
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
