import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from '../components/FoodCard';
import { mustDisplay, renderHeader } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Recipes extends Component {
  state = {
    meals: [],
    drinks: [],
  };

  componentDidMount() {
    const { setShow, history, updateHeader } = this.props;
    const { location: { pathname } } = history;
    // console.log(pathname)
    let pageTitle = '';
    if (pathname === '/drinks') {
      pageTitle = 'Drinks';
      setShow(false);
    } else if (pathname === '/meals') {
      pageTitle = 'Meals';
      setShow(true);
    }
    updateHeader(pageTitle, true, true);
    this.fetchMeals();
    this.fetchDrinks();
  }

  fetchMeals = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const MEALS_LENGTH = 11;
    const request = await fetch(endpoint);
    const { meals } = await request.json();
    const mealsData = meals.filter((meal, index) => index <= MEALS_LENGTH);
    this.setState({
      meals: mealsData,
    });
  };

  fetchDrinks = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const DRINKS_LENGTH = 11;
    const request = await fetch(endpoint);
    const { drinks } = await request.json();
    const drinksData = drinks.filter((drink, index) => index <= DRINKS_LENGTH);
    this.setState({
      drinks: drinksData,
    });
  };

  render() {
    const { meals, drinks } = this.state;
    const { show, history } = this.props;
    return (
      <>
        <Header history={ history } />
        <div>
          <h3>RECIPES</h3>
          {show && (
            meals.map(({ strMealThumb, strMeal }, index) => (<FoodCard
              key={ index }
              index={ index }
              src={ strMealThumb }
              name={ strMeal }
            />))
          )}
          {!show && (
            drinks.map(({ strDrinkThumb, strDrink }, index) => (<FoodCard
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
});

const mapStateToProps = ({ iMustDisplay }) => ({
  show: iMustDisplay.show,
});

Recipes.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  history: PropTypes.shape(
    {
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    },
  ).isRequired,
  updateHeader: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
