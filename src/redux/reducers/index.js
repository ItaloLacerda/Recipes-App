import { combineReducers } from 'redux';
import stateHeader from './stateHeader';
import iMustDisplay from './iMustDisplay';

const rootReducer = combineReducers({ stateHeader, iMustDisplay });

export default rootReducer;
