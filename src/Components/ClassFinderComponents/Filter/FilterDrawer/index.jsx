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
  floatingButton: {
    position: "fixed",
    top: '51%',
    zIndex: 999,
    transform: 'rotate(90deg)',
    letterSpacing: '2px',
    transition: 'all 0.25s ease-in-out',
    right: '85.65%',
    [theme.breakpoints.up('768')]: {
      right: '92.65%'
    },
    [theme.breakpoints.down('414')]: {
      right: '85.65%',
    },
  },
  drawer: {
    maxWidth: 250,
    padding: '0 8px',
  },
  transition: {
    left: 225,
    zIndex: 99999
  }
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
