import { combineReducers } from 'redux';

import stateHeader from './stateHeader';
import displayRecipes from './displayRecipes';
import iMustDisplay from './iMustDisplay';

const rootReducer = combineReducers({ stateHeader, displayRecipes, iMustDisplay });

export default rootReducer;
