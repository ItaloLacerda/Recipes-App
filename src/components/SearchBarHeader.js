import React from 'react';

function SearchBarHeader() {
  return (
    <form>
      <label htmlFor="search-input">
        <input
          id="search-input"
          type="input"
          data-testid="search-input"
        />
      </label>
      <div>
        <label htmlFor="ingredient-search-radio">
          busca de ingrediente
          <input
            id="ingredient-search-radio"
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name-search-radio">
          busca por nome
          <input
            id="name-search-radio"
            type="radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          busca da primeira letra
          <input
            id="first-letter-search-radio"
            type="radio"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
    </form>
  );
}

export default SearchBarHeader;
