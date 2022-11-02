import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import { mustDisplay, renderHeader, rendersRecipe } from '../redux/actions';
import Header from '../components/Header';
import TagsForFilters from '../components/TagsForFilter';
import { fetchMealsAndDrinks } from '../API/fetchAPI';
import Footer from '../components/Footer';
import '../css/recipes.css';

function Recipes({ show, recipes, setShow, history, updateHeader, setRecipe }) {
  const LENGTH = 11;

  const fetchRecipes = async (pathname) => {
    const fetchData = await fetchMealsAndDrinks(pathname);

    const data = fetchData.filter((_, index) => index <= LENGTH);
    setRecipe(data);
  };

  useEffect(() => {
    const { location: { pathname } } = history;

    let pageTitle = '';
    if (pathname === '/drinks') {
      pageTitle = 'Drinks';
      setShow(false);
    }
    if (pathname === '/meals') {
      pageTitle = 'Meals';
      setShow(true);
    }
    updateHeader(pageTitle, true, true);

    fetchRecipes(pathname);
  }, []);

  return (
    <div>
      {/* {console.log(recipes)} */}
      <Header history={ history } />
      <TagsForFilters history={ history } />
        <h3>RECIPES</h3>
      <div className="recipes_container">
        {show && (
          recipes.map(({ strMealThumb, strMeal, idMeal }, index) => (
            <Link to={ `/meals/${idMeal}` } key={ index }>
              <FoodCard
                index={ index }
                src={ strMealThumb }
                name={ strMeal }
              />
            </Link>
          ))
        )}
        {!show && (
          recipes.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
            <Link to={ `/drinks/${idDrink}` } key={ index }>
              <FoodCard
                index={ index }
                src={ strDrinkThumb }
                name={ strDrink }
              />
            </Link>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setShow: (bool) => dispatch(mustDisplay(bool)),
  updateHeader: (pageTitle, profileIcon, searchIcon) => (
    dispatch(renderHeader(pageTitle, profileIcon, searchIcon))),
  setRecipe: (recipes) => dispatch(rendersRecipe(recipes)),
});

const mapStateToProps = ({ iMustDisplay, displayRecipes }) => ({
  show: iMustDisplay.show,
  recipes: displayRecipes.recipes,
});

Recipes.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  updateHeader: PropTypes.func.isRequired,
  setRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
