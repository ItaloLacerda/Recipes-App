import React from 'react';
import PropTypes from 'prop-types';
import DrinkDetails from '../components/DrinkDetails';
import MealsDetails from '../components/MealsDetails';

function RecipeDetails({ match }) {
  return (
    match.url.includes('/drinks')
      ? <DrinkDetails match={ match } /> : <MealsDetails match={ match } />
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
