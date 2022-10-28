import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

import DrinkDetails from '../components/DrinkDetails';
import MealsDetails from '../components/MealsDetails';
import { seekRecommendations } from '../API/fetchAPI';

function RecipeDetails({ match }) {
  const [recommendations, setRecommendation] = useState([]);
  const [test, setTest] = useState(false);
  const renderRecommendations = async () => {
    const groupRecommendations = [];
    let recommendedDuo = [];
    let count = 0;
    const { params: id, url } = match;
    const recommendation = await seekRecommendations(id, url);
    recommendation.forEach((recipe) => {
      if (count < 2) {
        recommendedDuo.push(recipe);
        count += 1;
        if (recommendedDuo.length === 2) {
          groupRecommendations.push(recommendedDuo);
          count = 0;
          recommendedDuo = [];
        }
      }
    });
    setRecommendation(groupRecommendations);
    setTest(true);
  };

  useEffect(() => {
    renderRecommendations();
  }, []);

  return (
    <>
      {
        match.url.includes('/drinks')
          ? <DrinkDetails match={ match } /> : <MealsDetails match={ match } />

      }
      {
        test && (
          <Carousel>
            <Carousel.Item>
              {
                recommendations[0].map((recipe, index) => (
                  <div
                    data-testid={ `${index}-recommendation-card` }
                    key={ `${recipe}${index}` }
                  >
                    <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } />
                    <h5
                      data-testid={ `${index}-recommendation-title` }
                    >
                      {recipe.strDrink}
                    </h5>
                  </div>
                ))
              }
            </Carousel.Item>
            <Carousel.Item>
              {
                recommendations[1].map((recipe, index) => (
                  <div
                    data-testid={ `${index + 2}-recommendation-card` }
                    key={ `${recipe}${index}` }
                  >
                    <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } />
                    <h5
                      data-testid={ `${index + 2}-recommendation-title` }
                    >
                      {recipe.strDrink}
                    </h5>
                  </div>
                ))
              }
            </Carousel.Item>
            <Carousel.Item>
              {
                recommendations[2].map((recipe, index) => (
                  <div
                    data-testid={ `${index + 4}-recommendation-card` }
                    key={ `${recipe}${index}` }
                  >
                    <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } />
                    <h5
                      data-testid={ `${index + 4}-recommendation-title` }
                    >
                      {recipe.strDrink}
                    </h5>
                  </div>
                ))
              }
            </Carousel.Item>
          </Carousel>
        )
      }
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
