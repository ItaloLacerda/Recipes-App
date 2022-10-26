import { RENDER_RECIPE } from '../actions';

const initialState = {
  recipes: [],
};
const displayRecipes = (state = initialState, { type, payload }) => {
  switch (type) {
  case RENDER_RECIPE:
    return {
      ...state,
      recipes: payload,
    };
  default:
    return state;
  }
};

export default displayRecipes;
