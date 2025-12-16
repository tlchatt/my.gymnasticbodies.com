import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import UserInfo from './UserInfo';
import StatBox from './StatBox'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap:'wrap',
    padding: '4px 8px',
    [theme.breakpoints.down('sm')]: {
      padding: '4px',
    },
  },
  icon: {
    margin: 'auto 0 auto 4px'
  }
}))

const UserStats = props => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} className={classes.root}>
      <UserInfo />
      <StatBox icon={<CalendarTodayIcon className={classes.icon}/>} info='01.23.2020' subHead='Member Since' />
      <StatBox icon={<VideoLibraryIcon className={classes.icon} />} info='20' subHead='Completed Workouts' />
      <StatBox icon={<DoneAllIcon className={classes.icon} />} info='1' subHead='Completed Plans'/>
    </Grid>
  )
}

export default UserStats;
