export const RENDER_HEADER = 'RENDER_HEADER';

export const renderHeader = (pageTitle, profileIcon, searchIcon) => ({
  type: RENDER_HEADER,
  payload: {
    pageTitle,
    profileIcon,
    searchIcon,
  },
});
