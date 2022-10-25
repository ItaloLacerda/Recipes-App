import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './Header';
import { renderHeader } from '../redux/actions';

function Profile({ updateHeader, history }) {
  useEffect(() => {
    updateHeader('Profile', true, false);
  }, []);
  return (
    <Header history={ history } />
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateHeader: (pageTitle, profileIcon, searchIcon) => (
    dispatch(renderHeader(pageTitle, profileIcon, searchIcon))),
});

Profile.propTypes = {
  updateHeader: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(null, mapDispatchToProps)(Profile);
