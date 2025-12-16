import React, {useState, useEffect} from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  IconButton
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import moment from 'moment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as Sentry from "@sentry/react";

import GridContainer from '../../Components/UtilComponents/Mui-GridContainer'
import Container from '../../Components/UtilComponents/Container'
import AdminUnlockLesson from '../../Components/Thrive/AdminUnlockLesson.jsx'

import { showToast } from '../../Store/Action/calendarActions'
import axios from 'axios';


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

const EditUser = props => {
  const classes = useStyles();
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';
  const isAdmin = useSelector(state => state.login.isAdmin ? true : false);
  const webToken = useSelector(state => state.login.webToken);
  const { location } = props;
  const [lessons, setLessons] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLessons(location.data)
  }, [location])

  const handleUnlockTask = (taskNo) => {
    const userId = location.userId;

    var config = {
      method: 'post',
      url: `${API}/thrive/admin/users/${userId}/tasks/${taskNo}`,
      headers: {
        'Authorization': `Bearer ${webToken}`
      }
    };

    axios(config).then(res => {
      let newLessons = _.cloneDeep(lessons);
      let foundIndex = newLessons.findIndex(lesson => lesson.taskNo === taskNo);

      newLessons[foundIndex] = {
        ...newLessons[foundIndex],
        isTaskOpened: true,
        unlockedDate: moment().format('YYYY-MM-DD')
      }

      // console.log(newLessons);

      dispatch(showToast(`Unlocked Task ${taskNo}`, 'success'))

      setLessons(newLessons);
    }).catch(err => {
      dispatch(showToast(`Something Went wrong`, 'error'));
      Sentry.captureException(err);
    })
  }

  const edit = (
    <Container addedClasses={classes.background}>
      <GridContainer elevation={2} addbackground={true} center={true}>
        <Box m={1} style={{ width: '100%' }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
            <img className={classes.image} src={gfImage} alt="GymFit Logo" />
            <Typography variant='h3' className={classes.title}>Amin Dashboard</Typography>
            <Typography variant='body1' className={classes.subHeading}>Editing <span style={{color: '#1e88e5'}}>{location.userEmail}</span> Thrive Tasks. To unlock tasks for this user, click on the '+' button. Once unlocked, the button will be disabled.</Typography>
          </Grid>
        </Box>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: 8 }}>
          {
          !lessons
            ? <div className={classes.loading}><CircularProgress /></div>
            : <Box m={1}>
              <Typography variant="h6" className={classes.parts}>Part 1</Typography>
              {
                lessons.slice(0, 10).map((lesson, index) => <AdminUnlockLesson key={index} handleUnlockTask={handleUnlockTask} {...lesson}/>)
              }
              <Typography variant="h6" className={classes.parts}>Part 2</Typography>
              {
                lessons.slice(11,).map((lesson, index) => <AdminUnlockLesson key={index} handleUnlockTask={handleUnlockTask} {...lesson}/>)
              }
            </Box>
        }
        </Grid>
      <IconButton color='primary' style={{position: 'fixed', top: '8%', left: '4%',background: '#1e88e5', color: 'white',}} onClick={()=> props.history.goBack()}>
        <ArrowBackIcon/>
      </IconButton>
      </GridContainer>
    </Container>
  );

  return isAdmin && location.data ? edit : <Redirect to="/" />;

}

export default EditUser;
