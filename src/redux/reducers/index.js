import { combineReducers } from 'redux';

import stateHeader from './stateHeader';
import selectedSearch from './selectedSearch';
import iMustDisplay from './iMustDisplay';

const rootReducer = combineReducers({ stateHeader, selectedSearch, iMustDisplay });

export default rootReducer;
