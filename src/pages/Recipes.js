import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FoodCard from '../components/FoodCard';
import { mustDisplay, renderHeader } from '../redux/actions';
import Header from '../components/Header';
import { fetchMealsAndDrinks } from '../API/fetchAPI';

class Recipes extends Component {
  state = {
    meals: [],
    drinks: [],
  };

  async componentDidMount() {
    const { setShow, history, updateHeader } = this.props;
    const { location: { pathname } } = history;
    const LENGTH = 11;
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
    const fetchData = await fetchMealsAndDrinks(pathname);

    const data = fetchData.filter((meal, index) => index <= LENGTH);
    this.setState({
      meals: data,
      drinks: data,
    });
  }

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
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  updateHeader: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
