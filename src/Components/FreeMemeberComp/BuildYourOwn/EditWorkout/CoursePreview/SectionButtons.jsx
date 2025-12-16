import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      [theme.breakpoints.down(426)]: {
        margin: theme.spacing(.5)
      }
    },
    width: (props) => `${100 / props.amountOfButtons}%`,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 0,
    border: '1px solid #A0A0A0',
    fontFamily: 'Helvetica Neue',
    color: '#656464',
    fontWeight: 500,
    height: 50,
    maxWidth: 226,
    width: '100%',
    padding: 0,
    [theme.breakpoints.down(480)]: {
      height: 36,
      backgroundColor: '#A0A0A0',
      color: 'white',
      fontSize: 12,
      '&:hover': {
        backgroundColor: '#FF9435',
        border: '1px solid #FF9435',
      }
    }
  },
  isSelected: {
    backgroundColor: '#FF9435',
    color: 'white',
    border: '1px solid #FF9435',
    '&:hover': {
      backgroundColor: '#FF9435',
    },
  }
}));

export default function SectionButtons(props) {
  const classes = useStyles(props);

  return (
    <Grid className={classes.root}>
      <Button onClick={props.handleButtonSelect} variant='outlined' className={clsx(classes.button, { [classes.isSelected]: props.isSelected})}>{props.courseType}</Button>
    </Grid>
  );
}
