import list from 'reducers/profiles/profilesListReducers';
import form from 'reducers/profiles/profilesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
