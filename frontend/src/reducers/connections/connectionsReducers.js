import list from 'reducers/connections/connectionsListReducers';
import form from 'reducers/connections/connectionsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
