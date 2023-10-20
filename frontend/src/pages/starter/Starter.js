import React from 'react';
import { Link } from 'react-router-dom';

// styles
import useStyles from './styles';
import reactLogo from '../../images/react-logo.svg';

import { Button } from '../../components/Wrappers';

function Starter() {
  let classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.starterBlock}>
        <h3 className='my-3 align-self-center'>
          Welcome to Folkus!
        </h3>
        <div className={classes.buttons}>
          <Button
            className={classes.leftButton}
            component={Link}
            variant='contained'
            color='primary'
            size='large'
            to={'/login?tab=0'}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Starter;
