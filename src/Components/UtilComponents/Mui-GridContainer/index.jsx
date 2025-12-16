import React from 'react';
import {
  makeStyles,
  Grid,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fixTop: {
    padding: "56px 8px",
    [theme.breakpoints.down('sm')]:{
      padding: "56px 4px"
    }
  },
  background: {
    background: '#f9f9f9',
    flex: 1
  }
}))

const MuiGridContainer = (props) => {
  const classes = useStyles();
  let gridContainer;
  if (props.elevation) {
    gridContainer = (
      <Paper elevation={props.elevation} className={`${props.addbackground ? classes.background : null}`}>
        <Grid container className={classes.fixTop} justifyContent='center'>
          {props.children}
        </Grid>
      </Paper>
    )
  }
  else {
    gridContainer = (
      <Grid container className={classes.fixTop} {...props}>
        {props.children}
      </Grid>
    )
  }
  return gridContainer;
}

export default MuiGridContainer;
