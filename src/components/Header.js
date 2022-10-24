import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
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
