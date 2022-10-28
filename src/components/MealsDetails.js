import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { searchRecipeDetails } from '../API/fetchAPI';

export default function MealsDetails({ match }) {
  const deleteStringFromVideoLink = 32;

  const [productDetails, setProductDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const filterIngredients = (details) => {
    const newIngredientList = [];

    const ingredients = Object.entries(details)
      .filter((ingredient) => ingredient[0].includes('strIngredient'));

    const measure = Object.entries(details)
      .filter((ingredient) => ingredient[0].includes('strMeasure'));

    ingredients.forEach((ingredient, index) => {
      if (ingredient[1] !== '') {
        newIngredientList.push({
          ingredient: ingredient[1],
          measure: measure[index][1],
        });
      }
    });
    setIngredientList(newIngredientList);
  };

  const fetchFirstDetails = async () => {
    const { params: id, url } = match;
    const details = await searchRecipeDetails(id, url);
    setProductDetails(details);
    filterIngredients(details);
  };

  useEffect(() => {
    fetchFirstDetails();
  }, []);

  return (
    <>
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
      <h4>Ingredient List</h4>
      {
        ingredientList.map((ingredient, index) => (
          <p
            key={ `${ingredient}${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient.measure} ${ingredient.ingredient}`}
          </p>
        ))
      }
    </>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
