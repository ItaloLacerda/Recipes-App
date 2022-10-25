import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { renderHeader } from '../redux/actions';

function Recipes({ updateHeader, history }) {
  useEffect(() => {
    const { location: { pathname } } = history;
    let pageTitle = '';
    if (pathname === '/meals') {
      pageTitle = 'Meals';
    } else {
      pageTitle = 'Drinks';
    }
    updateHeader(pageTitle, true, true);
  }, []);
  return (
    <Header history={ history } />
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateHeader: (pageTitle, profileIcon, searchIcon) => (
    dispatch(renderHeader(pageTitle, profileIcon, searchIcon))),
});

Recipes.propTypes = {
  updateHeader: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Recipes);
