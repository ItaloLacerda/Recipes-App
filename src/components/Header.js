import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBarHeader from './SearchBar';

function Header({ pageTitle, renderProfileIcon, renderSearchIcon, history }) {
  const [search, setSearch] = useState(false);
  const handelClick = ({ target }) => {
    switch (target.alt) {
    case 'Profile Icon':
      history.push('/profile');
      break;
    default:
      setSearch(!search);
      break;
    }
  };
  return (
    <>
      <h3 data-testid="page-title">{pageTitle}</h3>
      {
        renderProfileIcon && (
          <button type="button" name="profile-top-btn" onClick={ handelClick }>
            <img
              data-testid="profile-top-btn"
              type="image/svg+xml"
              alt="Profile Icon"
              src={ profileIcon }
            />
          </button>
        )
      }
      { renderSearchIcon && (
        <button type="button" name="search-top-btn" onClick={ handelClick }>
          <img
            data-testid="search-top-btn"
            type="image/svg+xml"
            alt="Search Icon"
            src={ searchIcon }
          />
        </button>)}
      {search && (
        <SearchBarHeader />
      )}
    </>
  );
}
const mapStateToProps = ({ stateHeader }) => ({
  pageTitle: stateHeader.pageTitle,
  renderProfileIcon: stateHeader.profileIcon,
  renderSearchIcon: stateHeader.searchIcon,
});

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  renderProfileIcon: PropTypes.bool.isRequired,
  renderSearchIcon: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
