import { combineReducers } from 'redux';

import stateHeader from './stateHeader';
import selectedSearch from './selectedSearch';

const rootReducer = combineReducers({ stateHeader, selectedSearch });

export default rootReducer;
