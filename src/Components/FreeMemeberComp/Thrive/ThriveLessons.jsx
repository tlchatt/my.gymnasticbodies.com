import React, { useCallback, useEffect, useState} from 'react';
import { Typography, makeStyles, Grid, Box, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux'
import axios from 'axios';

import ThriveLessonsRow from '../../Thrive/ThriveLessonRow'
import ThriveModal from '../../Thrive/ThriveModal';
import UnlockAll from '../../Thrive/UnlockAll'
import ResetThrive from '../../Thrive/ResetThrive'


const useStyles = makeStyles(theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    width: '100%',
  },
  parts: {
    background: '#eeeeee',
    borderTop: '1px solid #dddddd',
    borderBottom: '1px solid #dddddd',
    padding: '10px 20px',
    width: '100%',
    lineHeight: 1
  },
  gridRoot: {
    display: 'flex',
    justifyContent: 'center',
  },
  cancel: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  buttonDiv: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      display: 'flex',
    }
  }
}));

const API = process.env.REACT_APP_API;

export default function ThriveLessons(props) {
  const classes = useStyles();
  const isThriveUser = useSelector(state => state.login.isThriveUser)
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.UserId);

  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    subText: '',
    mediaId: '',
  })

  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);

  const handleUnlock = () => {
    let config = {
      method: 'post',
      url: `${API}/thrive/unlock/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };
    axios(config)
      .then(res => {
        setOpen(false);
        props.showToast('Successful Unlocked  Thrive.', 'success')
        setLoading(true);
        getUserData();
      }).catch(err => {
        setOpen(false);
        props.showToast('Something went wrong. No worried we\'ve been notified!', 'error');
      });
  }



  const handleOpenModal = (title, subText, mediaId) => {
    setModalData({
      title: title,
      subText: subText,
      mediaId: mediaId
    });
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const getUserData = useCallback(() => {
    var config = {
      method: 'get',
      url: `${API}/thrive/lessons/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`
      }
    };
    axios(config).then(res => {
      setLessons(res.data)
      setLoading(false)
    }).catch(err => console.log(err))
  }, [webToken, userId])

  useEffect(() => {
    if (isThriveUser) {
      getUserData();
    }
  }, [isThriveUser, getUserData]);


  const secondCall = () => {
    var config = {
      method: 'post',
      url: `${API}/thrive/reset/permissions/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };
    axios(config)
      .then(res => props.showToast('Successful reset Thrive.', 'success'))
      .catch(err => {
        props.showToast('Something went wrong. No worried we\'ve been notified!', 'error')
      });
  }

  const handleReset = () => {
    var config = {
      method: 'delete',
      url: `${API}/thrive/reset/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };
    axios(config)
      .then(res => {
        setOpen(false);
        secondCall();
      }).catch(err => {
        setOpen(false);
        props.showToast('Something went wrong. No worried we\'ve been notified!', 'error')
      });
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: 8 }}>
        {
          loading
            ? <div className={classes.loading}><CircularProgress /></div>
            : <Box>
              <Typography variant="h6" className={classes.parts}>Part 1</Typography>
              {
                lessons.slice(0, 10).map((lesson, index) => <ThriveLessonsRow key={index}  handleOpenModal={handleOpenModal} {...lesson} />)
              }
              <Typography variant="h6" className={classes.parts}>Part 2</Typography>
              {
                lessons.slice(10,).map((lesson, index) => <ThriveLessonsRow key={index} handleOpenModal={handleOpenModal} {...lesson} />)
              }
            </Box>
        }
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridRoot}>
          <Box m={4} className={classes.buttonDiv}>
            <Button variant="contained" className={classes.cancel} onClick={() => setOpen(true)} disabled={lessons.filter(lesson => lesson.description !== null).length >= 19}>
              Unlock All
            </Button>
            <Button variant="contained" className={classes.cancel} onClick={() => setReset(true)}>
              Reset Thrive
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ThriveModal open={modalOpen} close={handleCloseModal} {...modalData} />
      <UnlockAll open={open} handleClose={() => setOpen(false)} handleUnlock={handleUnlock} />
      <ResetThrive open={reset} handleClose={() => setReset(false)} handleReset={handleReset}/>
    </Grid>
  );
}
