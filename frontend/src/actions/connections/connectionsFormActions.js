import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CONNECTIONS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CONNECTIONS_FORM_FIND_STARTED',
      });

      axios.get(`/connections/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'CONNECTIONS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CONNECTIONS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/connections'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CONNECTIONS_FORM_CREATE_STARTED',
      });

      axios.post('/connections', { data: values }).then((res) => {
        dispatch({
          type: 'CONNECTIONS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Connections created' });
        dispatch(push('/admin/connections'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CONNECTIONS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CONNECTIONS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/connections/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'CONNECTIONS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Connections updated' });
        dispatch(push('/admin/connections'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Connections update error' });
      dispatch({
        type: 'CONNECTIONS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
