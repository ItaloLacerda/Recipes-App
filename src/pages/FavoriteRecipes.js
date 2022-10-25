import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { renderHeader } from '../redux/actions';

function FavoriteRecipes({ updateHeader, history }) {
  useEffect(() => {
    updateHeader('Favorite Recipes', true, false);
  }, []);
  return (
    <Header history={ history } />
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateHeader: (pageTitle, profileIcon, searchIcon) => (
    dispatch(renderHeader(pageTitle, profileIcon, searchIcon))),
});

FavoriteRecipes.propTypes = {
  updateHeader: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(null, mapDispatchToProps)(FavoriteRecipes);
