import list from 'reducers/notes/notesListReducers';
import form from 'reducers/notes/notesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
