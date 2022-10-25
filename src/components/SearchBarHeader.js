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
            name="search-radio"
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name-search-radio">
          busca por nome
          <input
            id="name-search-radio"
            type="radio"
            name="search-radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          busca da primeira letra
          <input
            id="first-letter-search-radio"
            type="radio"
            name="search-radio"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <label htmlFor="exec-search-btn">
        <input
          id="exec-search-btn"
          type="button"
          data-testid="exec-search-btn"
          value="Buscar"
        />
      </label>
    </form>
  );
}

export default SearchBarHeader;
