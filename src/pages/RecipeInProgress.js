import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { searchRecipeDetails } from '../API/fetchAPI';

function arrayIngredients(recipe) {
  if (!recipe) {
    return [];
  }
  const ingredients = [];
  const numbers = [];
  const size = 20;
  for (let i = 1; i < size; i += 1) {
    numbers.push(i);
  }
  numbers.forEach((numero) => {
    if (!recipe[`strIngredient${numero}`]) {
      return ingredients;
    }
    ingredients.push({
      name: recipe[`strIngredient${numero}`],
      medida: recipe[`strMeasure${numero}`],
    });
  });
  return ingredients;
}

function RecipeInProgress({ match }) {
  const [productDetails, setProductDetails] = useState({});
  const ingredients = arrayIngredients(productDetails);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const ingredientMark = (ingredient) => {
    const content = document.querySelector(`#${ingredient}`);
    content.classList.add('riscado');
    const marked = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    marked[ingredient] = true;
    localStorage.setItem('inProgressRecipes', JSON.stringify(marked));
    forceUpdate();
  };

  const marked = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  console.log(Object.keys(marked).length, ingredients.length);

  async function fetchFirstDetails() {
    const { params: id, url } = match;
    const details = await searchRecipeDetails(
      { id: id.id_da_receita },
      url.replace('/in-progress', ''),
    );
    setProductDetails(details);
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

      <form>

        { ingredients.map((element, index) => (
          <label
            id={ `id${index}-ingredient-step` }
            className={ marked[`id${index}-ingredient-step`] ? 'riscado' : '' }
            htmlFor="recipe"
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            <input
              type="checkbox"
              onChangeCapture={ () => ingredientMark(`id${index}-ingredient-step`) }
              checked={ marked[`id${index}-ingredient-step`] }
            />
            {`${element.name} ${element.medida}`}
          </label>

        ))}
      </form>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ Object.keys(marked).length !== ingredients.length }
      >
        Finalizar

      </button>

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
