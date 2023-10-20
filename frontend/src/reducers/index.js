import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import connections from 'reducers/connections/connectionsReducers';

import events from 'reducers/events/eventsReducers';

import tasks from 'reducers/tasks/tasksReducers';

import accounts from 'reducers/accounts/accountsReducers';

import profiles from 'reducers/profiles/profilesReducers';

import notes from 'reducers/notes/notesReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    connections,

    events,

    tasks,

    accounts,

    profiles,

    notes,
  });
