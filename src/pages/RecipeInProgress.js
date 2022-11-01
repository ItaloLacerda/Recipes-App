import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { searchRecipeDetails } from '../API/fetchAPI';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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

function RecipeInProgress({ match, history }) {
  const [productDetails, setProductDetails] = useState({});
  const ingredients = arrayIngredients(productDetails);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [linkCopied, setLinkCopied] = useState(false);

  const [itsFavoriteRecipe, setitsFavoriteRecipe] = useState(false);

  const isFavorite = (ID) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      favoriteRecipes.forEach((recipe) => {
        console.log(recipe);
        if (recipe.id === ID) {
          setitsFavoriteRecipe(true);
        }
      });
    }
  };

  const shareLink = () => {
    setLinkCopied(true);
    copy(window.location.href.replace('/in-progress', ''));
  };

  const ingredientMark = (ingredient) => {
    const content = document.querySelector(`#${ingredient}`);
    content.classList.add('riscado');
    const marked = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    marked[ingredient] = true;
    localStorage.setItem('inProgressRecipes', JSON.stringify(marked));
    forceUpdate();
  };

  const marked = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

  const redirect = () => {
    const { path } = match;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    doneRecipes.push({
      alcoholicOrNot: path.includes('meals') ? '' : productDetails.strAlcoholic,
      category: productDetails.strCategory,
      doneDate: new Date().toISOString(),
      id: path.includes('meals') ? productDetails.idMeal : productDetails.idDrink,
      image: path.includes('meals')
        ? productDetails.strMealThumb : productDetails.strDrinkThumb,
      name: path.includes('meals') ? productDetails.strMeal : productDetails.strDrink,
      nationality: path.includes('meals') ? productDetails.strArea : '',
      tags: productDetails.strTags ? productDetails.strTags.split(',') : [],
      type: path.includes('meals') ? 'meal' : 'drink',
    });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };

  async function fetchFirstDetails() {
    const { params: id, url } = match;
    const details = await searchRecipeDetails(
      { id: id.id_da_receita },
      url.replace('/in-progress', ''),
    );
    setProductDetails(details);
  }

  const saveFavorite = () => {
    const { params: { id_da_receita }, path } = match;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const setStorage = {
      id: path.includes('meals') ? productDetails.idMeal : productDetails.idDrink,
      type: path.includes('meals') ? 'meal' : 'drink',
      nationality: path.includes('meals') ? productDetails.strArea : '',
      category: productDetails.strCategory,
      alcoholicOrNot: path.includes('meals') ? '' : productDetails.strAlcoholic,
      name: path.includes('meals') ? productDetails.strMeal : productDetails.strDrink,
      image: path.includes('meals')
        ? productDetails.strMealThumb : productDetails.strDrinkThumb,
    };
    if (favoriteRecipes) {
      if (itsFavoriteRecipe) {
        const newfavoriteRecipes = favoriteRecipes.filter(
          (recipe) => recipe.id !== id_da_receita);
        localStorage
          .setItem('favoriteRecipes', JSON.stringify([...newfavoriteRecipes]));
        setitsFavoriteRecipe(false);
      } else {
        localStorage
          .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, setStorage]));
        setitsFavoriteRecipe(true);
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([setStorage]));
      setitsFavoriteRecipe(true);
    }
  };

  useEffect(() => {
    const { params: { id_da_receita } } = match;

    fetchFirstDetails();
    isFavorite(id_da_receita);
  }, []);

  return (
    <div>
      <img
        src={ productDetails.strMealThumb }
        alt={ productDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{productDetails.strMeal}</h1>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareLink }
      >
        Compartilhar

      </button>
      { linkCopied && (<span>Link copied!</span>)}

      <button
        type="button"
        onClick={ saveFavorite }
      >
        {
          itsFavoriteRecipe ? (
            <img
              type="image/svg+xml"
              data-testid="favorite-btn"
              alt="whiteHeart Icon"
              src={ blackHeartIcon }
            />
          ) : (
            <img
              type="image/svg+xml"
              data-testid="favorite-btn"
              alt="blackHeart Icon"
              src={ whiteHeartIcon }
            />
          )
        }

      </button>

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
              onChange={ () => ingredientMark(`id${index}-ingredient-step`) }
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
        onClick={ redirect }
      >
        Finalizar

      </button>

    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id_da_receita: PropTypes.string,
    }),
    url: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};

export default RecipeInProgress;
