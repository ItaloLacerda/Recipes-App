import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { searchRecipeDetails } from '../API/fetchAPI';

function RecipeDetails({ match }) {
  useEffect(() => {
    async function fetchFirstDetails() {
      const { params: id, url } = match;
      await searchRecipeDetails(id, url);
    }
    fetchFirstDetails();
  }, []);
  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
