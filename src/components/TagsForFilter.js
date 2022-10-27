import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchByCategory from '../services/APIfetch';

function TagsForFilters({ history }) {
  const cinco = 5;
  const [fetchCategory, setFetchCategory] = useState([]);
  const type = history.location.pathname.substring(1);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchByCategory(type);
      setFetchCategory(response);
      console.log(response);
    };
    fetch();
  }, [type]);
  return (
    <div>
      {
        fetchCategory.slice(0, cinco).map((e, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
          >
            {e.strCategory}

          </button>))
      }
    </div>
  );
}

TagsForFilters.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.shape({
        substring: PropTypes.func,
      }),
    }),
    push: PropTypes.func,
  }),
}.isRequired;

export default TagsForFilters;
