import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      {/* <Route exact path="/" component={ } /> */}
      {/* <Route exact path="/meals" component={} /> */}
      {/* <Route exact path="/drinks" component={ } /> */}
      {/* <Route exact path="/meals/:id-da-receita" component={ } /> */}
      {/* <Route exact path="/drinks/:id-da-receita" component={ } /> */}
      {/* <Route exact path="/meals/:id-da-receita/in-progress" component={ } /> */}
      <Route exact path="/profile" component={ Profile } />
      {/* <Route exact path="/done-recipes" component={ } /> */}
      {/* <Route exact path="/favorite-recipes" component={ } /> */}
    </BrowserRouter>
  );
}

export default App;
