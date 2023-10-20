import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'ACCOUNTS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'ACCOUNTS_FORM_FIND_STARTED',
      });

      axios.get(`/accounts/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'ACCOUNTS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ACCOUNTS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/accounts'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'ACCOUNTS_FORM_CREATE_STARTED',
      });

      axios.post('/accounts', { data: values }).then((res) => {
        dispatch({
          type: 'ACCOUNTS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Accounts created' });
        dispatch(push('/admin/accounts'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ACCOUNTS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ACCOUNTS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/accounts/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'ACCOUNTS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Accounts updated' });
        dispatch(push('/admin/accounts'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Accounts update error' });
      dispatch({
        type: 'ACCOUNTS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
