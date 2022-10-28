import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinkDetails from '../components/DrinkDetails';
import MealsDetails from '../components/MealsDetails';
import { seekRecommendations } from '../API/fetchAPI';

function RecipeDetails({ match }) {
  useEffect(() => {
    const { params: id, url } = match;
    seekRecommendations(id, url);
  }, []);

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
