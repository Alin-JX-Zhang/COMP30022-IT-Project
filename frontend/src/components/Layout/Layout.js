import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Fab, IconButton } from '@mui/material';
import { connect } from 'react-redux';
// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { Link } from '../Wrappers';
import ColorChangeThemePopper from './components/ColorChangeThemePopper';

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard';
import BreadCrumbs from '../../components/BreadCrumbs';

// context
import { useLayoutState } from '../../context/LayoutContext';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersFormPageView from 'pages/CRUD/Users/form/UsersFormPageView';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import ConnectionsFormPage from 'pages/CRUD/Connections/form/ConnectionsFormPage';
import ConnectionsFormPageView from 'pages/CRUD/Connections/form/ConnectionsFormPageView';
import ConnectionsTablePage from 'pages/CRUD/Connections/table/ConnectionsTablePage';

import EventsFormPage from 'pages/CRUD/Events/form/EventsFormPage';
import EventsFormPageView from 'pages/CRUD/Events/form/EventsFormPageView';
import EventsTablePage from 'pages/CRUD/Events/table/EventsTablePage';

import TasksFormPage from 'pages/CRUD/Tasks/form/TasksFormPage';
import TasksFormPageView from 'pages/CRUD/Tasks/form/TasksFormPageView';
import TasksTablePage from 'pages/CRUD/Tasks/table/TasksTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url));
  return <span>Redirecting...</span>;
};

function Layout(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'add-section-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  // global
  let layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <BreadCrumbs />
        <Switch>
          <Route path='/admin/dashboard' component={Dashboard} />
          <Route path='/admin/user/edit' component={EditUser} />
          <Route
            path={'/admin/api-docs'}
            exact
            component={(props) => (
              <Redirect
                url={
                  process.env.NODE_ENV === 'production'
                    ? window.location.origin + '/api-docs'
                    : 'http://localhost:8080/api-docs'
                }
                {...props}
              />
            )}
          />

          <Route path={'/admin/users'} exact component={UsersTablePage} />
          <Route path={'/admin/users/new'} exact component={UsersFormPage} />
          <Route
            path={'/admin/users/:id/edit'}
            exact
            component={UsersFormPage}
          />
          <Route
            path={'/admin/users/:id/show'}
            exact
            component={UsersFormPageView}
          />

          <Route
            path={'/admin/connections'}
            exact
            component={ConnectionsTablePage}
          />
          <Route
            path={'/admin/connections/new'}
            exact
            component={ConnectionsFormPage}
          />
          <Route
            path={'/admin/connections/:id/edit'}
            exact
            component={ConnectionsFormPage}
          />
          <Route
            path={'/admin/connections/:id/show'}
            exact
            component={ConnectionsFormPageView}
          />

          <Route path={'/admin/events'} exact component={EventsTablePage} />
          <Route path={'/admin/events/new'} exact component={EventsFormPage} />
          <Route
            path={'/admin/events/:id/edit'}
            exact
            component={EventsFormPage}
          />
          <Route
            path={'/admin/events/:id/show'}
            exact
            component={EventsFormPageView}
          />

          <Route path={'/admin/tasks'} exact component={TasksTablePage} />
          <Route path={'/admin/tasks/new'} exact component={TasksFormPage} />
          <Route
            path={'/admin/tasks/:id/edit'}
            exact
            component={TasksFormPage}
          />
          <Route
            path={'/admin/tasks/:id/show'}
            exact
            component={TasksFormPageView}
          />
        </Switch>
        <Fab
          color='primary'
          aria-label='settings'
          onClick={(e) => handleClick(e)}
          className={classes.changeThemeFab}
          style={{ zIndex: 100 }}
        >
          <SettingsIcon style={{ color: '#fff' }} />
        </Fab>
        <ColorChangeThemePopper id={id} open={open} anchorEl={anchorEl} />
        <Footer>
          <div>
            <Link
              color={'primary'}
              href={'https://www.unimelb.edu.au/'}
              target={'_blank'}
              className={classes.link}
            >
              Unimelb IT-Project 2023
            </Link>
          </div>
        </Footer>
      </div>
    </div>
  );
}

export default withRouter(connect()(Layout));
