import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Box, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import ThriveLessons from './ThriveLessons'
import ThriveTasks from './ThriveTasks'
import Profile from './Profile'
import SnakBar from '../../SnakBar'

const useStyles = makeStyles(theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8'
  },
  parts: {
    background: '#eeeeee',
    borderTop: '1px solid #dddddd',
    borderBottom: '1px solid #dddddd',
    padding: '10px 20px',
    width: '100%',
    lineHeight: 1
  },
  thriveImageHeader: {
    width: '100%',
    maxHeight: 180,
    objectFit: 'cover'
  }
}));

const API = process.env.REACT_APP_API;

function Thrive(props) {
  const classes = useStyles();
  const webToken = useSelector(state => state.login.webToken);
  const UserId = useSelector(state => state.login.UserId);
  const { open } = props;

  const [loading, setLoading] = useState(true);
  const [showSnack, setShowSnack] = useState({ open: false, variation: 'success', message: '' });

  const showToast = (message,variation = 'success', timeout = 2500) => {
    setLoading(true);
    setShowSnack({ open: true, variation: variation, message: message });
    setLoading(false);
    setTimeout(() => {
      setShowSnack({ open: false, variation: variation, message: '' });
    }, timeout)
  }



  useEffect(() => {
    if (open) {
      const checkInitial = () => {
        let config = {
          method: 'post',
          url: `${API}/thrive/welcome/permissions/users/${UserId}`,
          headers: {
            'Authorization': `Bearer ${webToken}`,
          },
        };

        Axios(config).then(response => {
          setLoading(false);
        }).catch(error => {
          console.log(error);
        });
      };
      checkInitial();
    }
  }, [open, UserId, webToken]);

  return (
     <Box>
      <Box style={{ marginBottom: -6 }}>
        <img
          src="https://gymfit-images.s3.amazonaws.com/General/THRIVE.png"
          alt="Thrive header"
          className={classes.thriveImageHeader}
        />
      </Box>
      {!loading && <Profile showToast={showToast}/>}
      <Box m={2}>
        <Typography gutterBottom variant='h4' style={{ color: '#656464' }} >
          Thrive Tasks
        </Typography>
      </Box>
      {!loading && <ThriveTasks showToast={showToast}/>}
      <Divider />
      <Box m={2}>
        <Typography gutterBottom variant='h4' style={{ color: '#656464' }} >
          Thrive Lessons
        </Typography>
        <Typography align='center' variant='body1' style={{ color: '#656464', margin: '0 20px' }}>
          There are 19 tasks in our Thrive curriculum. Each task is intended to build a specific habit that will syncronize together with the tasks that come before and after it. You are now training for a healthier lifestyle!
        </Typography>
      </Box>
      {!loading && <ThriveLessons showToast={showToast} />}
      <SnakBar {...showSnack}/>
    </Box>
  );
}

export default Thrive;
