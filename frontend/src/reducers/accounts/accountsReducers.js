import list from 'reducers/accounts/accountsListReducers';
import form from 'reducers/accounts/accountsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
