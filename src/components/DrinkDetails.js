import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/drink.css';

import { searchRecipeDetails } from '../API/fetchAPI';

function DrinkDetails({ match }) {
  const [productDetails, setProductDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const filterIngredients = (details) => {
    const newIngredientList = [];

    const ingredients = Object.entries(details)
      .filter((ingredient) => ingredient[0].includes('strIngredient'));

    const measure = Object.entries(details)
      .filter((ingredient) => ingredient[0].includes('strMeasure'));

    ingredients.forEach((ingredient, index) => {
      if (ingredient[1] !== null) {
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
    // console.log(details);
    setProductDetails(details);
    localStorage.setItem('recipeDatail', JSON.stringify(details));
    filterIngredients(details);
  };

  useEffect(() => {
    fetchFirstDetails();
  }, []);

  return (
    <div className="container_drink">
      <img
        src={ productDetails.strDrinkThumb }
        alt={ productDetails.strDrink }
        data-testid="recipe-photo"
      />
      <br />
      <h1>Recipe Details</h1>
      <br />
      <h3 data-testid="recipe-title">
        {productDetails.strDrink}
      </h3>
      <br />
      <h4 data-testid="recipe-category">{ productDetails.strAlcoholic}</h4>
      <center>
        <p
          className="descrition"
          data-testid="instructions"
        >
          {productDetails.strInstructions}

        </p>

      </center>
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
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default DrinkDetails;
