import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { searchRecipeDetails } from '../API/fetchAPI';

function RecipeInProgress({ match }) {
  const [productDetails, setProductDetails] = useState({});
  async function fetchFirstDetails() {
    const { params: id, url } = match;
    const details = await searchRecipeDetails(
      { id: id.id_da_receita },
      url.replace('/in-progress', ''),
    );
    setProductDetails(details);
    // console.log(productDetails);
  }
  useEffect(() => {
    fetchFirstDetails();
  }, []);
  return (
    <div>
      <img
        src={ productDetails.strMealThumb }
        alt={ productDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{productDetails.strMeal}</h1>

      <button type="button" data-testid="share-btn">Compartilhar</button>

      <button type="button" data-testid="favorite-btn">Favoritar</button>

      <h4 data-testid="recipe-category">{ productDetails.strCategory }</h4>

      <p data-testid="instructions">{productDetails.strInstructions}</p>

      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id_da_receita: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeInProgress;
