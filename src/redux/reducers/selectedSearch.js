import { SELECTED_RADIO } from '../actions';

const initialState = {
  selectedRadio: '',
  searchContent: '',
};
const selectedSearch = (state = initialState, { type, payload }) => {
  switch (type) {
  case SELECTED_RADIO:
    return {
      ...state,
      selectedRadio: payload,
    };
  default:
    return state;
  }
};

export default selectedSearch;
