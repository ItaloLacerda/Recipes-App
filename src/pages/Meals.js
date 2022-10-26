import React, { Component } from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

class Meals extends Component {
  state = {
    isFood: true,
  };

  render() {
    const { isFood } = this.state;
    return (
      <div>
        <Header title="Meals" />
        <Recipes show={ isFood } />
      </div>
    );
  }
}
export default Meals;
