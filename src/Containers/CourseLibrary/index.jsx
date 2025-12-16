import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Divider,
  CircularProgress
} from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import clsx from 'clsx';


import GridContainer from '../../Components/UtilComponents/Mui-GridContainer'
import Container from '../../Components/UtilComponents/Container'
import CourseCards from '../../Components/CourseLibaryComponents/CourseCard'
import ProgressionRows from '../../Components/CourseLibaryComponents/ProgressionRows'
import CourseLibraryPlayer from '../../Components/CourseLibaryComponents/CourseLibraryPlayer'
import OhNoModal from '../../Components/OhNoModal';

import { mainCourses } from './data';

const API = process.env.REACT_APP_API;

const useStyles = makeStyles(theme => ({
  background: { background: '#eeeeee', marginBottom: 12 },
  image: {
    width: '128px',
    verticalAlign: 'middle'
  },
  title: {
    marginTop: 0,
    marginBottom: '24px',
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
  flexFlow: {
    flexFlow: 'row wrap',
    display: 'flex',
    textAlign: 'center',
  },
  loading: {
    justifyContent: 'center'
  }
}))

const cleanName = name => name.replace(/\s+/g, '').toLowerCase();

const CourseLibrary = (props) => {
  const classes = useStyles();
  const { webToken, UserId } = useSelector(state => state.login);
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';
  const secondRowRef = useRef();
  const thirdRowRef = useRef();
  const allProgsRef = useRef();

  const [secondRow, setSecondRow] = useState({
    data: [],
    show: false,
  });

  const [thirdRow, setThirdRow] = useState({
    data: [],
    show: false,
    loading: false
  });

  const [playerState, setPlayerState] = useState({
    open: false,
    videoName: '',
    title: '',
  });

  const [allProgs, setAllProgs] = useState([]);

  const [ohNoModal, setOhNoModal] = useState(false);

  const [hideReps, setHideReps] = useState(false);

  useEffect(() => {
    if (secondRow.show) {
      secondRowRef.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    }
  }, [secondRow])

  useEffect(() => {
    if (thirdRow.show) {
      thirdRowRef.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    }
  }, [thirdRow])

  useEffect(() => {
    if (allProgs.length > 0) {
      allProgsRef.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    }
  }, [allProgs])

  const handleCardClick = row => {
    if (row.associatedCourses && row.associatedCourses.length > 0) {
      setSecondRow({
        show: true,
        data: row.associatedCourses
      })
      if (thirdRow.show) {
        setThirdRow({
          show: false,
          data: [],
          loading: false
        })
      }
      if (allProgs.length > 0) {
        setAllProgs([]);
      }
    }
    else {
      if (secondRow.show) {
        setSecondRow({
          show: false,
          data: [],
        })
      }
      handleThirdRowClick(row);
    }
  }

  const handleThirdRowClick = row => {

    setThirdRow({
      ...thirdRow,
      show: true,
      loading: true
    })

    const config = {
      method: 'get',
      url: `${API}/workout-service/course-library/users/${UserId}/?workoutName=${row.nameId}`,
      headers: {
        Authorization: `Bearer ${webToken}`
      }
    }

    if (allProgs.length > 0) {
      setAllProgs([]);
    }


    axios(config).then(response => {
      const keys = Object.keys(response.data);
      if (response.data === "YOU AREN'T ENROLLED IN THIS COURSE.") {
        console.log('YOU AREN\'T ENROLLED IN THIS COURSE');
        setThirdRow({
          show: false,
          data: [],
          loading: false
        })
        setOhNoModal(true);
      }
      else {
        setThirdRow({
          show: true,
          data: keys,
          loading: false,
          imagePrefix: cleanName(row.name ? row.name : row.courseName),
          allData: response.data
        })
      }
    }).catch(error => {
      console.log(error);
    });
  }

  const handleShowProgs = (keyName) => {
    const strSereis = [
      'Thoracic Bridge',
      'Stretch Series - Thoracic Bridge',
      'Front Split',
      'Stretch Series - Front Split',
      'Middle Split',
      'Stretch Series - Middle Split'
    ];

    if (strSereis.includes(keyName)) {
      setHideReps(true)
    }
    else {
      setHideReps(false)
    }

    setAllProgs(thirdRow.allData[keyName]);
  }

  const closeModal = () => {
    setPlayerState({
      open: false,
      videoName: '',
      title: '',
    });
  }

  const openVideoModal = (videoName, title) => {
    setPlayerState({
      open: true,
      videoName,
      title,
    });
  }

  const Wrapper = ({ children }) => {
    if (props.basicLayout) {
      return (
        <Grid container>
          {children}
        </Grid>
      )
    }
    else {
      return (
        <Container addedClasses={classes.background}>
          <GridContainer elevation={0} addbackground={false}>
            {children}
          </GridContainer>
        </Container>
      )
    }
  }


  return (
    <Wrapper>
      <Box m={1} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
          <img className={classes.image} src={gfImage} alt="GymFit Logo" />
          <Typography variant='h3' className={classes.title}>
            Discover Our Course Content Below <span role='img' aria-labelledby='finger-down'>👇</span>
          </Typography>
        </Grid>
      </Box>
      <Box m={1} mb={2} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.flexFlow} >
          {
            mainCourses.map((course, key) => <CourseCards title={course.courseName} handleClick={() => handleCardClick(course)} imageUrl={course.imgUrl} key={key} />)
          }
        </Grid>
      </Box>
      {
        secondRow.show
          ? <>
            <Divider style={{ width: '100%' }} ref={secondRowRef} />
            <Box m={1} mb={2} style={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.flexFlow}>
                {
                  secondRow.data.map((course, key) => <CourseCards title={course.name} handleClick={() => handleThirdRowClick(course)} imageUrl={course.imgUrl} key={course.name + key} />)
                }
              </Grid>
            </Box>
          </>
          : null
      }
      {
        thirdRow.show
          ? <>
            <Divider style={{ width: '100%' }} />
            <div style={{ position: 'relative' }}>
              <div ref={thirdRowRef} style={{ position: 'absolute', top: -54, left: 0 }}></div>
            </div>
            <Box m={1} mb={2} style={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={12} lg={12} className={clsx(classes.flexFlow, { [classes.loading]: thirdRow.loading })}>
                {
                  thirdRow.loading
                    ? <CircularProgress color='primary' />
                    : thirdRow.data.map((course, key) => <CourseCards title={course} handleClick={() => handleShowProgs(course)} imageUrl={`${thirdRow.imagePrefix}-${cleanName(course)}.jpg`} key={course + key} />)
                }
              </Grid>
            </Box>
          </>
          : null
      }
      {
        allProgs.length > 0
          ? <Box style={{ width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <div ref={allProgsRef} style={{ position: 'absolute', top: -54, left: 0 }}></div>
            </div>
            {allProgs.map((prog, key) => <ProgressionRows hideReps={hideReps} key={key} openVideoModal={openVideoModal} {...prog} />)}
          </Box>
          : null
      }
      <CourseLibraryPlayer CloseModal={closeModal} {...playerState} />
      <OhNoModal open={ohNoModal} handleClose={() => setOhNoModal(false)} />
    </Wrapper>
  );
}


export default CourseLibrary;

