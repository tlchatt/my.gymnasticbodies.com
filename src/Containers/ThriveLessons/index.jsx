import React, {useState, useEffect, useCallback} from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Button
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Sentry from "@sentry/react";


import GridContainer from '../../Components/UtilComponents/Mui-GridContainer'
import Container from '../../Components/UtilComponents/Container'
import ThriveLessonsRow from '../../Components/Thrive/ThriveLessonRow.jsx'
import ThriveModal from '../../Components/Thrive/ThriveModal.jsx'
import UnlockAll from '../../Components/Thrive/UnlockAll.jsx'

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
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8'
  },
  gridRoot: {
    display: 'flex',
    justifyContent: 'center'
  },
}))

const API = process.env.REACT_APP_API;

const ThriveLessons = props => {
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
  const dispatch = useDispatch()

  const handleUnlock = () => {
    var config = {
      method: 'post',
      url: `${API}/thrive/unlock/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };
    axios(config)
      .then(res => {
        setOpen(false);
        dispatch(showToast('Successful Unlocked  Thrive.', 'success'));
        setLoading(true);
        getUserData();
      }).catch(err => {
        setOpen(false);
        Sentry.captureException(err);
        dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'))
      });
  }


  const classes = useStyles();
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';

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
    }).catch(err => Sentry.captureException(err))
  }, [webToken, userId])

  useEffect(() => {
    if (isThriveUser) {
      getUserData();
    }

  }, [webToken, userId, isThriveUser, getUserData]);

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

  const thriveLessonsComp = (
    <Container addedClasses={classes.background}>
      <GridContainer elevation={2} addbackground={true} center={true}>
        <Box m={1} style={{ width: '100%' }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
            <img className={classes.image} src={gfImage} alt="GymFit Logo" />
            <Typography variant='h3' className={classes.title}>Thrive Lessons</Typography>
            <Typography variant='body1' className={classes.subHeading}>There are 19 tasks in our Thrive curriculum. Each task is intended to build a specific habit that will syncronize together with the tasks that come before and after it. You are now training for a healthier lifestyle!</Typography>
          </Grid>
        </Box>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridRoot}>
          <Box m={1}>
            <Button variant="contained" color="primary" style={{ letterSpacing: '0.65px'}} onClick={() => setOpen(true)} disabled={lessons.filter(lesson => lesson.description !== null).length >= 19}>
              Unlock All
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: 8 }}>
          {
            loading
              ? <div className={classes.loading}><CircularProgress /></div>
              : <Box m={1}>
                <Typography variant="h6" className={classes.parts}>Part 1</Typography>
                {
                  lessons.slice(0, 10).map((lesson, index) => <ThriveLessonsRow key={index} {...lesson} handleOpenModal={handleOpenModal} />)
                }
                <Typography variant="h6" className={classes.parts}>Part 2</Typography>
                {
                  lessons.slice(10,).map((lesson, index) => <ThriveLessonsRow key={index} {...lesson} handleOpenModal={handleOpenModal}/>)
                }
              </Box>
          }
        </Grid>
      </GridContainer>
      <ThriveModal open={modalOpen} close={handleCloseModal} {...modalData} />
      <UnlockAll open={ open } handleClose={() => setOpen(false)} handleUnlock={handleUnlock}  />
    </Container>
  )

  return  isThriveUser ? thriveLessonsComp : <Redirect to="/" />

}


export default ThriveLessons;
