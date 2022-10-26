import { SET_SHOW } from '../actions';

const initialState = {
  show: false,
};

export default function iMustDisplay(state = initialState, { type, payload }) {
  switch (type) {
  case SET_SHOW:
    return {
      ...state,
      show: payload,
    };
  default:
    return state;
  }
}
