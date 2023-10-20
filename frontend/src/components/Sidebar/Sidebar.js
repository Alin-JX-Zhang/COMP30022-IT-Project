import React, { useState, useEffect, useMemo } from 'react';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Drawer, IconButton, List } from '@mui/material';
import { useTheme } from '@mui/material';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';

import {
  Home as HomeIcon,
  Apps as CoreIcon,
  Description as DocumentationIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';

// styles
import useStyles from './styles';
import useStyles2 from './components/SidebarLink/styles';

// components
import SidebarLink from './components/SidebarLink/SidebarLink';

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/LayoutContext';

function Sidebar({ location, structure }) {
  let classes = useStyles();
  let classes2 = useStyles2();
  let theme = useTheme();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
  }, [managementDispatch, managementValue]);

  const toggleDrawer = (value) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (value && !isPermanent) toggleSidebar(layoutDispatch);
  };

  // global
  let { isSidebarOpened } = useLayoutState();
  let layoutDispatch = useLayoutDispatch();

  // local
  let [isPermanent, setPermanent] = useState(true);

  const isSidebarOpenedWrapper = useMemo(
    () => (!isPermanent ? !isSidebarOpened : isSidebarOpened),
    [isPermanent, isSidebarOpened],
  );

  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpenedWrapper,
        [classes.drawerClose]: !isSidebarOpenedWrapper,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpenedWrapper,
          [classes.drawerClose]: !isSidebarOpenedWrapper,
        }),
      }}
      open={isSidebarOpenedWrapper}
      onClose={toggleDrawer(true)}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List
        className={classes.sidebarList}
        classes={{ padding: classes.padding }}
      >
        <SidebarLink
          label='Dashboard'
          link='/admin/dashboard'
          location={location}
          isSidebarOpened={isSidebarOpenedWrapper}
          icon={<HomeIcon />}
          toggleDrawer={toggleDrawer(true)}
        />

        <SidebarLink
          label='Edit User'
          link='/admin/user/edit'
          location={location}
          isSidebarOpened={isSidebarOpenedWrapper}
          icon={<ProfileIcon />}
          toggleDrawer={toggleDrawer(true)}
        />

        {
          <SidebarLink
            label='Users'
            link='/admin/users'
            location={location}
            isSidebarOpened={isSidebarOpenedWrapper}
            icon={<CoreIcon />}
            toggleDrawer={toggleDrawer(true)}
          />
        }

        {
          <SidebarLink
            label='Connections'
            link='/admin/connections'
            location={location}
            isSidebarOpened={isSidebarOpenedWrapper}
            icon={<CoreIcon />}
            toggleDrawer={toggleDrawer(true)}
          />
        }

        {
          <SidebarLink
            label='Events'
            link='/admin/events'
            location={location}
            isSidebarOpened={isSidebarOpenedWrapper}
            icon={<CoreIcon />}
            toggleDrawer={toggleDrawer(true)}
          />
        }

        {
          <SidebarLink
            label='Tasks'
            link='/admin/tasks'
            location={location}
            isSidebarOpened={isSidebarOpenedWrapper}
            icon={<CoreIcon />}
            toggleDrawer={toggleDrawer(true)}
          />
        }

        {
          <SidebarLink
            label='Profiles'
            link='/admin/profiles'
            location={location}
            isSidebarOpened={isSidebarOpenedWrapper}
            icon={<CoreIcon />}
            toggleDrawer={toggleDrawer(true)}
          />
        }

        {
          <SidebarLink
            label='Notes'
            link='/admin/notes'
            location={location}
            isSidebarOpened={isSidebarOpenedWrapper}
            icon={<CoreIcon />}
            toggleDrawer={toggleDrawer(true)}
          />
        }
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    let windowWidth = window.innerWidth;
    let breakpointWidth = theme.breakpoints.values.md;
    let isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
