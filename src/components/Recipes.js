import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FoodCard from './FoodCard';

class Recipes extends Component {
  state = {
    meals: [],
    drinks: [],
  };

  componentDidMount() {
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
    const { show } = this.props;
    return (
      <div>
        <h3>RECIPES</h3>
        { show && (
          meals.map(({ strMealThumb, strMeal }, index) => (<FoodCard
            key={ index }
            index={ index }
            src={ strMealThumb }
            name={ strMeal }
          />))
        )}
        { !show && (
          drinks.map(({ strDrinkThumb, strDrink }, index) => (<FoodCard
            key={ index }
            index={ index }
            src={ strDrinkThumb }
            name={ strDrink }
          />))
        )}
      </div>
    );
  }
}

Recipes.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Recipes;
