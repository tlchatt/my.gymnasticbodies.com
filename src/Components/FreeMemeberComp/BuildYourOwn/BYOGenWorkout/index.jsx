import React from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

// import { generateWorkout, loadPreviousDay } from '../../../../Store/Action/FreeMemberActions'

import { copyLastWorkoutBYO, copyLastWeeksWorkout } from '../../../../Store/Action/WorkoutBuilderActions'

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#6C6C6C',
  },
  button: {
    width: 'auto',
    [theme.breakpoints.down(476)]: {
      minWidth: '80%',
      width: 'auto'
    }
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0'
  }
}));

const BYOGenWorkout = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    dateKey,
    dateKeyIndex,
    showEdit,
    openLoadFavModal
  } = props;

  const handleCopyLastWorkout = () => {
    dispatch(copyLastWorkoutBYO(dateKeyIndex, dateKey))
  }

  return (
    <Box p={1}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography gutterBottom align='center' variant='h5' className={classes.title}>
            This day doesn't have a workout yet.
          </Typography>
        </Grid>
        <Box pt={2} pb={4} style={{ width: '100%' }}>
          <Grid container justifyContent='center'>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
              <Button onClick={showEdit} size='large' variant='contained' style={{ backgroundColor: 'white', color: '#656464', fontSize: 18, padding: '4px 22px', width: '80%', maxWidth: 300 }}>
                Start New
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
              <Button onClick={handleCopyLastWorkout} variant='contained' style={{ backgroundColor: 'white', color: '#656464', fontSize: 18, padding: '4px 22px', width: '80%', maxWidth: 300 }}>
                Copy last Workout
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
              <Button onClick={openLoadFavModal} variant='contained' className={classes.button} style={{ backgroundColor: 'white', color: '#656464', fontSize: 18, padding: '4px 22px', width: '80%', maxWidth: 300 }}>
                Load a favorite workout
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
              <Button onClick={() => dispatch(copyLastWeeksWorkout())} variant='contained' className={classes.button} style={{ backgroundColor: 'white', color: '#656464', fontSize: 18, padding: '4px 22px', width: '80%', maxWidth: 300 }}>
                Copy last Week
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default BYOGenWorkout;
