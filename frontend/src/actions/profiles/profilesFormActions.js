import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'PROFILES_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PROFILES_FORM_FIND_STARTED',
      });

      axios.get(`/profiles/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PROFILES_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROFILES_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/profiles'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PROFILES_FORM_CREATE_STARTED',
      });

      axios.post('/profiles', { data: values }).then((res) => {
        dispatch({
          type: 'PROFILES_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Profiles created' });
        dispatch(push('/admin/profiles'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROFILES_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PROFILES_FORM_UPDATE_STARTED',
      });

      await axios.put(`/profiles/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PROFILES_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Profiles updated' });
        dispatch(push('/admin/profiles'));
      }
    } catch (error) {
      Errors.handle(error);
      showSnackbar({ type: 'error', message: 'Profiles update error' });
      dispatch({
        type: 'PROFILES_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
