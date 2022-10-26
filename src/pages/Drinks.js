import React, { Component } from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

class Drinks extends Component {
  state = {
    isFood: false,
  };

  render() {
    const { isFood } = this.state;
    return (
      <div>
        <Header title="Drinks" />
        <Recipes show={ isFood } />
      </div>
    );
  }
}

export default Drinks;
