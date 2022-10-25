export const RENDER_HEADER = 'RENDER_HEADER';
export const SELECTED_RADIO = 'SELECTED_RADIO';

export const renderHeader = (pageTitle, profileIcon, searchIcon) => ({
  type: RENDER_HEADER,
  payload: {
    pageTitle,
    profileIcon,
    searchIcon,
  },
});
export const selectedRadio = (payload) => ({
  type: SELECTED_RADIO,
  payload,
});
