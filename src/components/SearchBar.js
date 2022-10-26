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
    case 'first-letter-search-radio':
      setRadio('First letter');
      break;
    default:
      break;
    }
  };

  const handelClick = (SEARCH_INPUT, RADIO) => {
    const { pathname } = history.location;
    switch (RADIO) {
    case 'Ingredient':
      fetchFilterIngredient(SEARCH_INPUT, pathname);
      break;
    case 'Name':
      fetchSearchName(SEARCH_INPUT, pathname);
      break;
    case 'First letter':
      if (SEARCH_INPUT.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        fetchSearchFirstLetter(SEARCH_INPUT, pathname);
      }
      break;
    default:
      break;
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
  }).isRequired,
};
export default SearchBarHeader;
