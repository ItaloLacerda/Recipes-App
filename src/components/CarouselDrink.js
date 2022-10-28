import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';

import Carousel from 'react-bootstrap/Carousel';
import { seekRecommendations } from '../API/fetchAPI';

function CarouselDrink({ match }) {
  const four = 4;
  const [recommendations, setRecommendation] = useState([]);
  const [renderCarousel, setrenderCarousel] = useState(false);

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
    setrenderCarousel(true);
  };

  useEffect(() => {
    renderRecommendations();
  }, []);

  return (

    renderCarousel && (
      <Carousel>
        <Carousel.Item>
          {
            recommendations[0].map((recipe, index) => (
              <div
                data-testid={ `${index}-recommendation-card` }
                key={ `${recipe}${index}` }
              >
                <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
                <h5
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recipe.strMeal}
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
                <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
                <h5
                  data-testid={ `${index + 2}-recommendation-title` }
                >
                  {recipe.strMeal}
                </h5>
              </div>
            ))
          }
        </Carousel.Item>
        <Carousel.Item>
          {
            recommendations[2].map((recipe, index) => (
              <div
                data-testid={ `${index + four}-recommendation-card` }
                key={ `${recipe}${index}` }
              >
                <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
                <h5
                  data-testid={ `${index + four}-recommendation-title` }
                >
                  {recipe.strMeal}
                </h5>
              </div>
            ))
          }
        </Carousel.Item>
      </Carousel>
    )
  );
}

CarouselDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default CarouselDrink;
