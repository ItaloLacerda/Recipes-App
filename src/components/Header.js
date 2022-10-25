import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageTitle, renderProfileIcon, renderSearchIcon }) {
  return (
    <>
      <h3 data-testid="page-title">{pageTitle}</h3>
      {
        renderProfileIcon && (
          <Link to="/profile">
            <div>
              <img
                data-testid="profile-top-btn"
                type="image/svg+xml"
                alt="Profile Icon"
                src={ profileIcon }
              />
            </div>
          </Link>
        )
      }
      { renderSearchIcon && (
        <div>
          <img
            data-testid="search-top-btn"
            type="image/svg+xml"
            alt="Search Icon"
            src={ searchIcon }
          />
        </div>)}
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
};

export default connect(mapStateToProps)(Header);
