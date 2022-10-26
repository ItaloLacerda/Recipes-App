import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
// import Meals from './pages/Meals';
// import Drinks from './pages/Drinks';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/meals/:id-da-receita" component={ RecipeDetails } />
      <Route path="/drinks/:id-da-receita" component={ RecipeDetails } />
      <Route path="/meals/:id-da-receita/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ RecipeInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
