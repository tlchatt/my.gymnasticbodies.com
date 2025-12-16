import React from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useDispatch } from 'react-redux';

import { generateWorkout, loadPreviousDay } from '../../../../Store/Action/FreeMemberActions'


const useStyles = makeStyles((theme) => ({
  title: {
    color: '#6C6C6C',
  },
}));

const GenerateWorkout = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    openLoadFavModal,
    dateKey,
    dateKeyIndex
  } = props;

  const handleGen = () => {
    dispatch(generateWorkout(dateKeyIndex, dateKey));
  }

  const getPreviousDay = () => {
    dispatch(loadPreviousDay(dateKeyIndex, dateKey));
  }


  return (
    <Box p={1}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography gutterBottom align='center' variant='h5' className={classes.title}>
            This day doesn’t have a workout yet.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'flex', justifyContent: 'center',  paddingTop: 12 }}>
          <Button size='large' onClick={handleGen} variant='contained' startIcon={<AutorenewIcon />} style={{backgroundColor: 'white', color: '#656464', fontSize: 18, padding: '4px 22px',  width: '82%', maxWidth: 270}}>
            Generate Workout
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'flex', justifyContent: 'center', paddingTop: 32}}>
          <Button variant='contained' style={{color: '#656464' , width: '82%', maxWidth: 270 }} onClick={getPreviousDay}>
          Copy the previous workout.
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'flex', justifyContent: 'center', paddingTop: 12 }}>
          <Button variant='contained' style={{ color: '#656464', width: '82%', maxWidth: 270 }} onClick={ openLoadFavModal}>
          Load a favorite workout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GenerateWorkout;
