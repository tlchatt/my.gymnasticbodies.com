import React from 'react';
import { Grid, makeStyles, Divider, Typography, Button } from '@material-ui/core';


// Custom Compnents
import FilterGroups from './FilterGroups'

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
    letterSpacing: 0.4,
    display: 'flex',
  },
  fixPadding: {
    paddingTop: 4
  },
  smallButton: {
    marginLeft: 'auto',
    padding: '0 5px',
    letterSpacing: 1
  }
}));

const ClassFinderGrid = props => {
  const classes = useStyles();

  return (
    <Grid container justifyContent='center' className={`${props.addClass ? props.addClass : null}`}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant='h4' className={classes.title}>
          Filter Results
          <Button className={classes.smallButton} size="small" onClick={props.reset}>
          Reset
        </Button>
        </Typography>

       <Divider className={classes.divider} />
      </Grid>
      <FilterGroups data='MySchedule' filters={['My Schedule']} fixPadding={classes.fixPadding} handleFilters={props.handleFilters} checked={props.checked.MySchedule} />
      <FilterGroups data='difficulty' title='Dificulty' filters={['Beginner', 'Moderate', 'Intermediate', 'Advanced']} handleFilters={props.handleFilters} checked={props.checked.difficulty} />
      {
        props.hideType ? null : <FilterGroups data='type' title='Training Type' filters={['Warmup', 'Strength', 'Mobility', 'Movement']} handleFilters={props.handleFilters} checked={props.checked.type} />
      }
      <FilterGroups data='duration' title='Workout Duration' filters={['Short', 'Medium', 'Long']} subtext={['< 15 min', '15 - 30 min', '> 30 min']} handleFilters={props.handleFilters} checked={props.checked.duration} />
    </Grid>
  )
}

export default ClassFinderGrid;
