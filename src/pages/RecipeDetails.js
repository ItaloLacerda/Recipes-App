import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { searchRecipeDetails } from '../API/fetchAPI';

function RecipeDetails({ match }) {
  const deleteStringFromVideoLink = 32;
  const [productDetails, setProductDetails] = useState({});
  async function fetchFirstDetails() {
    const { params: id, url } = match;
    const details = await searchRecipeDetails(id, url);
    setProductDetails(details);
  }

  useEffect(() => {
    fetchFirstDetails();
  }, []);

  return (
    <>
      {console.log(productDetails)}
      <h1>RecipeDetails</h1>
      <h3 data-testid="recipe-title">{productDetails.strMeal}</h3>
      <h4 data-testid="recipe-category">{ productDetails.strCategory }</h4>
      <img
        src={ productDetails.strMealThumb }
        alt={ productDetails.strMeal }
        data-testid="recipe-photo"
      />
      <p data-testid="instructions">{productDetails.strInstructions}</p>
      {
        productDetails.strYoutube
      && <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ `https://www.youtube.com/embed/${productDetails.strYoutube.slice(deleteStringFromVideoLink)}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
        encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      }
    </>
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
