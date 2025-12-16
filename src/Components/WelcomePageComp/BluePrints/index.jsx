import React from 'react';
import { makeStyles, Grid, Typography, Paper } from '@material-ui/core';

import CourseList from './CourseList'
import './styles.scss'

const useStyles = makeStyles(theme => ({
  blueprints: {
    width: '100%',
    maxWidth: '580px',
    margin: 'auto',
    background: 'linear-gradient(to right, #005281 25%, #4387b1 100%)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 350
  },
  paddingS: {
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      padding: 4
    }
  },
  gfTitle: {
    marginTop: 12,
    color: 'white',
    fontWeight: 300,
    textTransform: 'uppercase',
    display: 'flex',
  },
}));

const BluePrints = (props) => {
  const classes = useStyles();


  return (
    <Grid className={classes.paddingS} item xs={12} sm={6} md={6} lg={6}>
      <Paper elevation={2} className={classes.blueprints}>
        <Typography variant='h4' align="center" className={` gf-blueprints ${classes.gfTitle}`}>
          Blueprints
        </Typography>
          <CourseList/>
      </Paper>
    </Grid>
  );
}

export default BluePrints;
