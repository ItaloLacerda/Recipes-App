export const RENDER_HEADER = 'RENDER_HEADER';
export const LOGIN = 'LOGIN';
export const SET_SHOW = 'SET_SHOW';

export const renderHeader = (pageTitle, profileIcon, searchIcon) => ({
  type: RENDER_HEADER,
  payload: {
    pageTitle,
    profileIcon,
    searchIcon,
  },
});

export const login = (userData) => ({
  type: LOGIN,
  payload: { userData },
});

export const mustDisplay = (payload) => ({
  type: SET_SHOW,
  payload,
});
