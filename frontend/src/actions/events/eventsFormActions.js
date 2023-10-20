import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'EVENTS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'EVENTS_FORM_FIND_STARTED',
      });

      axios.get(`/events/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'EVENTS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EVENTS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/events'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'EVENTS_FORM_CREATE_STARTED',
      });

      axios.post('/events', { data: values }).then((res) => {
        dispatch({
          type: 'EVENTS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Events created' });
        dispatch(push('/admin/events'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'EVENTS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'EVENTS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/events/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'EVENTS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Events updated' });
        dispatch(push('/admin/events'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Events update error' });
      dispatch({
        type: 'EVENTS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
