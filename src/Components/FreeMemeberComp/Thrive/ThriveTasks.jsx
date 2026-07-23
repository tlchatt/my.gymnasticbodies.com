import React, {useEffect, useState, useCallback, memo} from 'react';
import {
  makeStyles,
  Box,
  IconButton
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux'
import TasksCards from './TasksCards'
import axios from 'axios';

import { CompleteIcon, GreenComplete } from '../Drawer/SvgIcons'


const useStyles = makeStyles(theme=>({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    width: '100%',
  },
  root: {
    display: 'flex',
  }
}))

const NEWAPI = process.env.REACT_APP_API_NEW;
const THRIVE_URL = `${NEWAPI}/api/user/workout/thrive`;

const ThriveTasks = props => {
  const isThriveUser = useSelector(state => state.login.isThriveUser);
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.neonUserId);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [missedDays, setMissedDays] = useState(false);

  const classes = useStyles();

  const getUserData = useCallback( () => {
    if (!userId) return;
    var config = {
      method: 'get',
      url: `${THRIVE_URL}?userId=${encodeURIComponent(userId)}&view=tasks`,
      headers: {
        'Authorization': `Bearer ${webToken}`
      }
    };
    axios(config).then(res => {
      setTasks(res.data)
      setLoading(false);

    }).catch(err => console.log(err))
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
      url: THRIVE_URL,
      headers: {
        'Authorization': `Bearer ${webToken}`,
        'Content-Type': 'application/json'
      },
      data: { userId, op: 'log-tasks', taskIds }
    };
    setLoading(true);
    axios(config).then(res => {
      if (res.data === 'Please upload picture before logging.') {
        props.showToast(res.data, 'error');
      }
      else {
        setTasks(res.data)
        props.showToast('Successful logged Thrive.');
      }
      setLoading(false);
    }).catch(err => {
      props.showToast('Something went wrong. No worried we\'ve been notified!', 'error');
    })
  }


  const thriveTasksComp = (
    <Box m={1}>
      <div className={classes.root}>
        {
          loading
            ? <div className={classes.loading}><CircularProgress /></div>
            : tasks.map((task, index) => <TasksCards key={index} {...task} />)
        }
        <div style={{margin: 'auto', marginRight: 8}}>
          <IconButton aria-label="upload picture" component="span" size='medium' onClick={handleCompleteAll} disabled={tasks.filter(task => task.isCompleted === true).length > 0}>
            { tasks.filter(task => task.isCompleted === true).length > 0 ? <GreenComplete/> :<CompleteIcon /> }
          </IconButton>
        </div>
      </div>
    </Box>
  )

  return  thriveTasksComp

}


export default memo(ThriveTasks);
