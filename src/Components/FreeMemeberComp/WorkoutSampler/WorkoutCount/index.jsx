import React from 'react';
import {
  makeStyles,
  Typography,
  Card,
  IconButton
} from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
  verticalText: {
    fontSize: '1rem',
    textTransform: "uppercase",
    letterSpacing: 0.5,
    position: "absolute",
    bottom: "0",
    left: "0",
    transform: 'rotate(270deg)',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    transformOrigin: '0px 0px',
    minWidth: 250 - 48,
    marginLeft: 15,
    fontWeight: 500,
    color: '#656464'
  },
  rounds: {
    padding: 8,
    paddingLeft: 0
  },
  card: {
    display: "inline-block",
    height: "100%",
    width: 50,
    position: "relative",
  }
}));

const WorkoutCount = (props) => {
  const classes = useStyles();
  const { openGenerateWorkout, isLogged, isPreviousDay} = props;

  return (
    <div className={classes.rounds}>
      <Card className={classes.card} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} elevation={3}>
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={openGenerateWorkout} disabled={isLogged || isPreviousDay} >
            <SettingsIcon style={{ fontSize: 28 }} />
          </IconButton>
        <Typography className={classes.verticalText} variant='h4' >
          Beginner Workout {props.workoutCount}
        </Typography>
      </Card>
    </div>
  )
}

export default WorkoutCount;
