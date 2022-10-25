import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageTitle, renderProfileIcon, renderSearchIcon }) {
  return (
    <>
      <h3 data-testid="page-title">{pageTitle}</h3>
      {
        renderProfileIcon && (
          <div>
            <object
              data-testid="profile-top-btn"
              type="image/svg+xml"
              data={ profileIcon }
            >
              profileIcon
            </object>
          </div>)
      }
      { renderSearchIcon && (
        <div>
          <object
            data-testid="search-top-btn"
            type="image/svg+xml"
            data={ searchIcon }
          >
            searchIcon
          </object>
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
