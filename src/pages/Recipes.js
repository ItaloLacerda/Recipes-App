import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from '../components/FoodCard';
import { mustDisplay, renderHeader, rendersRecipe } from '../redux/actions';
import Header from '../components/Header';
import { fetchMealsAndDrinks } from '../API/fetchAPI';
import Footer from '../components/Footer';

class Recipes extends Component {
  async componentDidMount() {
    const { setShow, history, updateHeader, setRecipe } = this.props;
    const { location: { pathname } } = history;
    const LENGTH = 11;

    let pageTitle = '';
    if (pathname === '/drinks') {
      pageTitle = 'Drinks';
      setShow(false);
    } else if (pathname === '/meals') {
      pageTitle = 'Meals';
      setShow(true);
    }
    updateHeader(pageTitle, true, true);
    const fetchData = await fetchMealsAndDrinks(pathname);

    const data = fetchData.filter((_, index) => index <= LENGTH);
    console.log(data);
    setRecipe(data);
  }

  render() {
    const { show, history, recipes } = this.props;
    return (
      <>
        <Header history={ history } />
        <div>
          <h3>RECIPES</h3>
          {show && (
            recipes.map(({ strMealThumb, strMeal }, index) => (<FoodCard
              key={ index }
              index={ index }
              src={ strMealThumb }
              name={ strMeal }
            />))
          )}
          {!show && (
            recipes.map(({ strDrinkThumb, strDrink }, index) => (<FoodCard
              key={ index }
              index={ index }
              src={ strDrinkThumb }
              name={ strDrink }
            />))
          )}
        </div>
        <Footer />
      </>
    );
  }
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
  recipes: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
