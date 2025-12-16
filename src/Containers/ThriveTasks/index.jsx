import React, {useEffect, useState, useCallback} from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import TasksCards from './TasksCards'
import axios from 'axios';
import * as Sentry from "@sentry/react";

import GridContainer from '../../Components/UtilComponents/Mui-GridContainer'
import Container from '../../Components/UtilComponents/Container'
// import MissedDays from '../../Components/Thrive/MissedDays.jsx'

import { showToast } from '../../Store/Action/calendarActions'

const useStyles = makeStyles(theme=>({
  background: { background: '#eeeeee', marginBottom: 12 },
  image: {
    width: '128px',
    verticalAlign: 'middle'
  },
  title: {
    marginTop: 0,
    marginBottom: '12px',
    fontSize: '40px',
    fontWeight: 400,
    [theme.breakpoints.down(415)]: {
      fontSize: '28px',
    },
    [theme.breakpoints.up(766)]: {
      fontSize: '32px',
    },
    [theme.breakpoints.up(1024)]: {
      fontSize: '40px',
    }
  },
  subHeading: {
    margin: '0 auto',
    width: '75%',
    [theme.breakpoints.down(415)]: {
      width: '100%',
    },
  },
  parts: {
    background: '#eeeeee',
    borderTop: '1px solid #dddddd',
    borderBottom: '1px solid #dddddd',
    padding: '10px 20px',
    width: '100%',
    lineHeight: 1
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
    margin: 10,
  },
  span: {
    textDecoration: 'line-through',
    color: '#aaaaaa'
  },
  gridRoot: {
    padding: 8,
    display: 'flex',
    justifyContent: 'center'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8'
  }
}))

const API = process.env.REACT_APP_API;

const ThriveTasks = props => {
  const isThriveUser = useSelector(state => state.login.isThriveUser);
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.UserId);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [missedDays, setMissedDays] = useState(false);

  const classes = useStyles();
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';

  const getUserData = useCallback( () => {
    var config = {
      method: 'post',
      url: `${API}/thrive/tasks/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`
      }
    };
    axios(config).then(res => {
      setTasks(res.data)
      setLoading(false);

    }).catch(err => Sentry.captureException(err))
  }, [webToken, userId])

  useEffect(() => {
    if (isThriveUser) {
      getUserData();
    }

  }, [isThriveUser, getUserData]);

  const handleCompleteAll = () => {
    let taskIds = tasks.map(task => task.usersTaskId).join(',')
    var config = {
      method: 'post',
      url: `${API}/thrive/tasks/log/users/${userId}?taskIds=${taskIds}`,
      headers: {
        'Authorization': `Bearer ${webToken}`
      }
    };
    setLoading(true);
    axios(config).then(res => {
      if (res.data === 'Please upload picture before logging.') {
        dispatch(showToast(res.data, 'error'));
      }
      else {
        setTasks(res.data)
        dispatch(showToast('Successful logged Thrive.', 'success'));
      }
      setLoading(false);
    }).catch(err => {
      Sentry.captureException(err);
      dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'))
    })
  }

  const thriveTasksComp = (
    <Container addedClasses={classes.background}>
      <GridContainer elevation={2} addbackground={true} center={true}>
        <Box m={1} style={{ width: '100%' }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
            <img className={classes.image} src={gfImage} alt="GymFit Logo" />
            <Typography variant='h3' className={classes.title}>Thrive Tasks</Typography>
            <Typography variant='body1' className={classes.subHeading}>To complete todays Thrive Tasks click on the Complete All button.</Typography>
            {/* <Link onClick={ () => setMissedDays(true) } style={{cursor: 'pointer'}}>Missed some days? Click me!</Link> */}
          </Grid>
        </Box>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridRoot}>
          <Box m={1}>
            <Button variant="contained" color="primary" style={{ letterSpacing: '0.65px'}} onClick={handleCompleteAll} disabled={tasks.filter(task => task.isCompleted === true).length > 0}>
              Completed My Tasks
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box m={1}>
            <Grid container justifyContent='center'>
              {
                loading
                  ? <div className={classes.loading}><CircularProgress /></div>
                  : tasks.map((task, index) => <TasksCards key={index} {...task}/> )
              }
            </Grid>
          </Box>
        </Grid>
      </GridContainer>
      {/* <MissedDays open={missedDays} handleClose={ () => setMissedDays(false) }/> */}
    </Container>
  )

  return  isThriveUser ? thriveTasksComp : <Redirect to="/" />

}


export default ThriveTasks;
