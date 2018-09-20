import { combineReducers } from 'redux';
import types from './typesReducer';
import aws from './awsReducer';
import gcp from './gcpReducer';
import view from './viewReducer';



// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  types,
  aws,
  gcp,
  view,
});

export default rootReducer;
