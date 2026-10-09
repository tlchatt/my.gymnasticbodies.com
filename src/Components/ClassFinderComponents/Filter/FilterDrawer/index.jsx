import React from 'react';
import clsx from 'clsx';
import { makeStyles, Drawer, Button } from '@material-ui/core';


// Custom imports
import Filter from '../index'
import Aux from '../../../../HOC/aux'

const useStyles = makeStyles(theme => ({
  classFinderGrid: {
    padding: '8px',
    paddingBottom: '40px'
  },
  padding: {
    padding: 8
  },
  divider: {
    marginBottom: 8,
    marginTop: 8
  },
  title: {
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1,
    margin: '24px 0',
    letterSpacing: 0.4
  },
  fixPadding: {
    paddingTop: 4
  },
  // In-flow button above the results. It used to be fixed to the left screen edge, where
  // the member site's side icon bar now covers it.
  floatingButton: {
    margin: '16px 8px 0',
    letterSpacing: '2px',
  },
  drawer: {
    maxWidth: 250,
    padding: '0 8px',
  },
  // No longer raised above the open drawer (it sat over the filter list); the drawer
  // closes by tapping outside it.
  transition: {}
}));

const ClassFinderGridDrawer = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Filter hideType={props.hideType} handleFilters={props.handleFilters} addClass={classes.drawer} checked={props.checked} reset={props.reset}/>
    </div>
  );

  return (
    <Aux>
      <Button className={`${classes.floatingButton} ${state.left ? classes.transition : null }`} variant="contained" color="primary" onClick={toggleDrawer('left', !state.left)}>
        {
          !state.left ? 'Filters' : 'Close'
        }
      </Button>
      <Drawer
        transitionDuration={250}
        anchor='left'
        open={state.left}
        onClose={toggleDrawer('left', false)}
        // onOpen={toggleDrawer('left', true)}
        className={classes.drawer}
      >
        {list('left')}
      </Drawer>
    </Aux>
  );
}

export default ClassFinderGridDrawer;
