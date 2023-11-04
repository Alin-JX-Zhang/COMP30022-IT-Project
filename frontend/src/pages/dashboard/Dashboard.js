import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [connections, setConnections] = useState(0);
  const [events, setEvents] = useState(0);
  const [tasks, setTasks] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [setUsers, setConnections, setEvents, setTasks];

    const responseUsers = axios.get(`/users/count`);
    const responseConnections = axios.get(`/connections/count`);
    const responseEvents = axios.get(`/events/count`);
    const responseTasks = axios.get(`/tasks/count`);
    Promise.allSettled([
      responseUsers,
      responseConnections,
      responseEvents,
      responseTasks,
    ]).then((res) =>
      res.forEach((el, i) => {
        if (el.status === 'fulfilled') {
          fns[i](el.value.data.count);
        }
      }),
    );
  }
  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>
        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
              <Widget title={'Users'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Users:{' '}
                    <span className={classes.widgetTextCount}>{users}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/connections'} style={{ textDecoration: 'none' }}>
              <Widget title={'Connections'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Connections:{' '}
                    <span className={classes.widgetTextCount}>
                      {connections}
                    </span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/events'} style={{ textDecoration: 'none' }}>
              <Widget title={'Events'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Events:{' '}
                    <span className={classes.widgetTextCount}>{events}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }

        {
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Link to={'/admin/tasks'} style={{ textDecoration: 'none' }}>
              <Widget title={'Tasks'}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <InfoIcon color='primary' sx={{ mr: 1 }} />
                  <p className={classes.widgetText}>
                    Tasks:{' '}
                    <span className={classes.widgetTextCount}>{tasks}</span>
                  </p>
                </div>
              </Widget>
            </Link>
          </Grid>
        }
      </Grid>
    </div>
  );
};

export default Dashboard;
