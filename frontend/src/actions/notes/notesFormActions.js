import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'NOTES_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'NOTES_FORM_FIND_STARTED',
      });

      axios.get(`/notes/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'NOTES_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'NOTES_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/notes'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'NOTES_FORM_CREATE_STARTED',
      });

      axios.post('/notes', { data: values }).then((res) => {
        dispatch({
          type: 'NOTES_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Notes created' });
        dispatch(push('/admin/notes'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'NOTES_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'NOTES_FORM_UPDATE_STARTED',
      });

      await axios.put(`/notes/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'NOTES_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Notes updated' });
        dispatch(push('/admin/notes'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Notes update error' });
      dispatch({
        type: 'NOTES_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
