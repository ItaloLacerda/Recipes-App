import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchFilterIngredient, fetchSearchFirstLetter,
  fetchSearchName } from '../API/fetchAPI';
import { rendersRecipe } from '../redux/actions';

function SearchBarHeader({ history, setRecipe }) {
  const [searchInput, setSearchInput] = useState('');
  const [radio, setRadio] = useState('');
  const handelChange = ({ target }) => {
    switch (target.id) {
    case 'search-input':
      setSearchInput(target.value);
      break;
    case 'ingredient-search-radio':
      setRadio('Ingredient');
      break;
    case 'name-search-radio':
      setRadio('Name');
      break;
    default:
      setRadio('First letter');
      break;
    }
  };

  const filterRecipes = (resultsFetch, pathname) => {
    let data = [];
    const LENGTH = 11;
    console.log(resultsFetch);
    if (resultsFetch[pathname.substring(1)] !== null) {
      data = resultsFetch[pathname.substring(1)].filter((_, index) => index <= LENGTH);
      setRecipe(data);
    }
  };

  const handelClick = async (SEARCH_INPUT, RADIO) => {
    const { pathname } = history.location;
    let resultsFetch = [];

    switch (RADIO) {
    case 'Ingredient':
      resultsFetch = await fetchFilterIngredient(SEARCH_INPUT, pathname);
      filterRecipes(resultsFetch, pathname);
      break;
    case 'Name':
      resultsFetch = await fetchSearchName(SEARCH_INPUT, pathname);
      filterRecipes(resultsFetch, pathname);
      break;
    case 'First letter':
      if (SEARCH_INPUT.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        resultsFetch = { [pathname.substring(1)]: [] };
      } else {
        resultsFetch = await fetchSearchFirstLetter(SEARCH_INPUT, pathname);
        filterRecipes(resultsFetch, pathname);
      }
      break;
    default:
      break;
    }

    if (resultsFetch[pathname.substring(1)] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (resultsFetch[pathname.substring(1)] !== null
     && resultsFetch[pathname.substring(1)].length === 1) {
      if (pathname === '/meals') {
        const productId = resultsFetch[pathname.substring(1)][0].idMeal;
        history.push(`${pathname}/${productId}`);
      }
      if (pathname === '/drinks') {
        const productId = resultsFetch[pathname.substring(1)][0].idDrink;
        history.push(`${pathname}/${productId}`);
      }
    }
  };

  return (
    <form>
      <label htmlFor="search-input">
        <input
          id="search-input"
          type="input"
          value={ searchInput }
          onChange={ handelChange }
          data-testid="search-input"
        />
      </label>
      <div>
        <label htmlFor="ingredient-search-radio">
          Ingredient
          <input
            id="ingredient-search-radio"
            name="search-radio"
            type="radio"
            onChange={ handelChange }
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name-search-radio">
          Name
          <input
            id="name-search-radio"
            name="search-radio"
            type="radio"
            onChange={ handelChange }
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          First letter
          <input
            id="first-letter-search-radio"
            name="search-radio"
            type="radio"
            onChange={ handelChange }
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <label htmlFor="exec-search-btn">
        <input
          id="exec-search-btn"
          type="button"
          onClick={ () => handelClick(searchInput, radio) }
          data-testid="exec-search-btn"
          value="Search"
        />
      </label>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setRecipe: (recipes) => dispatch(rendersRecipe(recipes)),
});

SearchBarHeader.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  setRecipe: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(SearchBarHeader);
