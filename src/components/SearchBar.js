import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { fetchFilterIngredient, fetchSearchFirstLetter,
  fetchSearchName } from '../API/fetchAPI';

function SearchBarHeader({ history }) {
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

  const handelClick = async (SEARCH_INPUT, RADIO) => {
    const { pathname } = history.location;
    let resultsFetch = [];
    switch (RADIO) {
    case 'Ingredient':
      resultsFetch = await fetchFilterIngredient(SEARCH_INPUT, pathname);
      break;
    case 'Name':
      resultsFetch = await fetchSearchName(SEARCH_INPUT, pathname);
      break;
    case 'First letter':
      if (SEARCH_INPUT.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        resultsFetch = { [pathname.substring(1)]: [] };
      } else {
        resultsFetch = await fetchSearchFirstLetter(SEARCH_INPUT, pathname);
      }
      break;
    default:
      break;
    }

    if (resultsFetch[pathname.substring(1)].length === 1) {
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
SearchBarHeader.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
};
export default SearchBarHeader;
