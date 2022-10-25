import { RENDER_HEADER } from '../actions';

const initialState = {
  pageTitle: '',
  profileIcon: false,
  searchIcon: false,
};
export default function stateHeader(state = initialState, { type, payload }) {
  switch (type) {
  case RENDER_HEADER:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
}
