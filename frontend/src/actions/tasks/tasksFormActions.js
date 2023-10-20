import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'TASKS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'TASKS_FORM_FIND_STARTED',
      });

      axios.get(`/tasks/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'TASKS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TASKS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/tasks'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'TASKS_FORM_CREATE_STARTED',
      });

      axios.post('/tasks', { data: values }).then((res) => {
        dispatch({
          type: 'TASKS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Tasks created' });
        dispatch(push('/admin/tasks'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TASKS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'TASKS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/tasks/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'TASKS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Tasks updated' });
        dispatch(push('/admin/tasks'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Tasks update error' });
      dispatch({
        type: 'TASKS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
