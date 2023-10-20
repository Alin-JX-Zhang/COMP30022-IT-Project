import list from 'reducers/events/eventsListReducers';
import form from 'reducers/events/eventsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
