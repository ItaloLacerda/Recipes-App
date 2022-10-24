import React from 'react';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <>
      <h3 data-testid="page-title">Titulo da pagina</h3>
      <div>
        <object
          data-testid="profile-top-btn"
          type="image/svg+xml"
          data={ profileIcon }
        >
          profileIcon
        </object>
      </div>
      <div>
        <object
          data-testid="search-top-btn"
          type="image/svg+xml"
          data={ searchIcon }
        >
          searchIcon
        </object>
      </div>
    </>
  );
}
const mapStateToProps = () => {

};

const mapDispatchToProps = () => {

};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
