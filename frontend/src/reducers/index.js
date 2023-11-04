import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import connections from 'reducers/connections/connectionsReducers';

import events from 'reducers/events/eventsReducers';

import tasks from 'reducers/tasks/tasksReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    connections,

    events,

    tasks,
  });
