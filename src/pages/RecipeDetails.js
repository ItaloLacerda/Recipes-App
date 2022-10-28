import React from 'react';
import PropTypes from 'prop-types';

import DrinkDetails from '../components/DrinkDetails';
import MealsDetails from '../components/MealsDetails';
import CarouselMeal from '../components/CarouselMeal';
import CarouselDrink from '../components/CarouselDrink';

function RecipeDetails({ match }) {
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
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
