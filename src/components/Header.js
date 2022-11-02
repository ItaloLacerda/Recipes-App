import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBarHeader from './SearchBar';
import '../css/header.css';

function Header({ pageTitle, renderProfileIcon, renderSearchIcon, history }) {
  const [search, setSearch] = useState(false);
  const handelClick = ({ target }) => {
    console.log(target.className)
    switch (target.className) {
    case 'bi bi-person-circle':
      history.push('/profile');
      break;
    default:
      setSearch(!search);
      break;
    }
  };
  return (
    <div className="header">
      {
        renderProfileIcon && (
          <button className="BTN_header" type="button" name="profile-top-btn" onClick={ handelClick }>
            <i className="bi bi-search" />
          </button>
        )
      }
      <h3 className="text_header" data-testid="page-title">{pageTitle}</h3>
      { renderSearchIcon && (
        <button className="BTN_header" type="button" name="search-top-btn" onClick={ handelClick }>
          <i className="bi bi-person-circle" />
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
