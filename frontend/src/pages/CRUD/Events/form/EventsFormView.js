import { Formik } from 'formik';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as connectionsActions } from 'actions/connections/connectionsListActions';

import * as dataFormat from 'pages/CRUD/Events/table/EventsDataFormatters';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars
import ItemsList from 'components/FormItems/items/ItemsList';

import eventsFields from 'pages/CRUD/Events/helpers/eventsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import ConnectionsSelectItem from 'pages/CRUD/Connections/helpers/ConnectionsSelectItem';

const EventsForm = (props) => {
  const { findLoading, record, onCancel } = props;

  const iniValues = () => {
    return IniValues(eventsFields, record || {});
  };
  const dispatch = useDispatch();

  const connectionsRows = useSelector((store) => store.connections.list.rows);

  useEffect(() => {
    dispatch(connectionsActions.doFetch());
  }, []);

  const renderForm = () => (
    <Widget title={'View events'} collapse close>
      <Formik initialValues={iniValues()}>
        {(form) => (
          <form>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {eventsFields['name'].label}
                </Typography>
                <Typography>{form.values.name}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {eventsFields['note'].label}
                </Typography>
                <Typography>{form.values.note}</Typography>
              </Grid>

              <Grid mr={3} item>
                <ItemsList
                  tableName={'involved'}
                  items={form.values.involved.map((item) => ({
                    name: item.name,
                    id: item.id,
                  }))}
                  name={'connections'}
                  nameRow={'name'}
                />
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {eventsFields['startTime'].label}
                </Typography>
                <Typography>
                  {form.values.startTime.toLocaleDateString() +
                    ' ' +
                    form.values.startTime.toLocaleTimeString().slice(0, -6)}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6' style={{ marginBottom: 10 }}>
                  {eventsFields['endTime'].label}
                </Typography>
                <Typography>
                  {form.values.endTime.toLocaleDateString() +
                    ' ' +
                    form.values.endTime.toLocaleTimeString().slice(0, -6)}
                </Typography>
              </Grid>

              <Grid container ml={3} mt={3}>
                <Grid item>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => onCancel()}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Widget>
  );
  if (findLoading) {
    return <Loader />;
  }
  return renderForm();
};
export default EventsForm;
