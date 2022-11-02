import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchByCategory, fetchMealsAndDrinks, filterByCategory } from '../API/fetchAPI';
import { rendersRecipe } from '../redux/actions';
import All from '../images/icones/all.png'
import Beef from '../images/icones/beef.png'
import Breakfast from '../images/icones/breakfast.png'
import Chicken from '../images/icones/chicken.png'
import Dessert from '../images/icones/dessert.png'
import Goat from '../images/icones/goat.png'
import '../css/TagsForFilter.css';

function TagsForFilters({ history, setRecipes }) {
  const icones = [Beef, Breakfast, Chicken, Dessert, Goat]
  const cinco = 5;
  const LENGTH = 11;
  const type = history.location.pathname.substring(1);
  const filterRecipesSelect = {
    Beef: false,
    Breakfast: false,
    Chicken: false,
    Dessert: false,
    Goat: false,
    Ordinary_Drink: false,
    Cocktail: false,
    Shake: false,
    Other_Unknown: false,
    Cocoa: false,
  };
  const [fetchCategory, setFetchCategory] = useState([]);
  const [buttonAll, setButtonAll] = useState(false);
  const [filterSelect, setfilterSelect] = useState(filterRecipesSelect);

  const fetch = async () => {
    const response = await fetchByCategory(type);
    console.log(response);
    setFetchCategory(response);
  };

  const handelClick = async ({ target }) => {
    if (target.name === 'buttonAll' || filterSelect[target.name]
    || filterSelect.Ordinary_Drink || filterSelect.Other_Unknown) {
      const fetchData = await fetchMealsAndDrinks(history.location.pathname);

      const data = fetchData.filter((_, index) => index <= LENGTH);
      setRecipes(data);
      setButtonAll(false);
      setfilterSelect(filterRecipesSelect);
    } else {
      const recipesFilter = await filterByCategory(
        target.name,
        history.location.pathname,
      );
      const data = recipesFilter.filter((_, index) => index <= LENGTH);
      setButtonAll(true);
      setRecipes(data);

      switch (target.name) {
      case 'Ordinary Drink':
        setfilterSelect({
          ...filterRecipesSelect,
          Ordinary_Drink: true,
        });
        break;
      case 'Other_Unknown':
        setfilterSelect({
          ...filterRecipesSelect,
          Other_Unknown: true,
        });
        break;
      default:
        setfilterSelect({
          ...filterRecipesSelect,
          [target.name]: true,
        });
        break;
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="tagsFilter">
      {
        fetchCategory.slice(0, cinco).map((e, index) => (
          <button
            className="BTN_filter"
            key={ index }
            type="button"
            name={ e.strCategory }
            data-testid={ `${e.strCategory}-category-filter` }
            onClick={ handelClick }
          >
            {/* {e.strCategory} */}
            <img src={icones[index]} alt={ e.strCategory } name={ e.strCategory } />
          </button>))
      }
      {
        buttonAll && (
          <button
            className="BTN_filter"
            type="button"
            name="buttonAll"
            data-testid="All-category-filter"
            onClick={ handelClick }
          >
            <img src={All} name="buttonAll" />
          </button>
        )
      }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (recipes) => dispatch(rendersRecipe(recipes)),
});

TagsForFilters.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.shape({
        substring: PropTypes.func,
      }),
    }),
    push: PropTypes.func,
  }),
  setRecipes: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(TagsForFilters);
