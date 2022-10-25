import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { renderHeader } from '../redux/actions';

function Recipes({ updateHeader }) {
  useEffect(() => {
    updateHeader('Done Recipes', true, false);
  }, []);
  return (
    <Header />
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateHeader: (pageTitle, profileIcon, searchIcon) => (
    dispatch(renderHeader(pageTitle, profileIcon, searchIcon))),
});

Recipes.propTypes = {
  updateHeader: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Recipes);
