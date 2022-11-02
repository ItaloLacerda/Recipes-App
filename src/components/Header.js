import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import searchIcon from '../images/searchIcon.svg';
import SearchBarHeader from './SearchBar';
import '../css/header.css';

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
    <div className="header">
      {/* <h3 data-testid="page-title">{pageTitle}</h3> */}
      {
        renderProfileIcon && (
          <button className="BTN_header" type="button" name="profile-top-btn" onClick={ handelClick }>
            <i class="bi bi-person-circle" />
          </button>
        )
      }
      { renderSearchIcon && (
        <button className="BTN_header" type="button" name="search-top-btn" onClick={ handelClick }>
          <i class="bi bi-search" />
        </button>)}
      {search && (
        <SearchBarHeader history={ history } />
      )}
    </div>
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
