import React, { useState } from 'react';
import { fetchTheMealDBFilterIngredient,
  fetchTheMealDBSearchFirstLetter, fetchTheMealDBSearchName } from '../API/fetchAPI';

function SearchBarHeader() {
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
    switch (RADIO) {
    case 'Ingredient':
      fetchTheMealDBFilterIngredient(SEARCH_INPUT);
      break;
    case 'Name':
      fetchTheMealDBSearchName(SEARCH_INPUT);
      break;
    case 'First letter':
      if (SEARCH_INPUT.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        fetchTheMealDBSearchFirstLetter(SEARCH_INPUT);
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

export default SearchBarHeader;
