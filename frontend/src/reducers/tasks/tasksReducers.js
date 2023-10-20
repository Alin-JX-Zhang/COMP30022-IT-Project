import list from 'reducers/tasks/tasksListReducers';
import form from 'reducers/tasks/tasksFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
