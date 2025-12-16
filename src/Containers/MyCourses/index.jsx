import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles, Grid, Box, Link } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import Wrapper from '../../Components/UtilComponents/Wrapper'
import MyCoursesCard from './MyCourseCards';
import CoursePreivewData from '../../Components/FreeMemeberComp/BuildYourOwn/EditWorkout/CoursePreview/CoursePreivewData';
import { openLegacyWorkoutModal } from '../../Store/Action/WorkoutBuilderActions';
import PathSelection from '../../Components/FreeMemeberComp/InitialPage/PathSelection';
import LegacyWorkoutModal from '../../Components/LegacyWorkoutModal';

import { AxiosConfig } from '../../Store/util';
import { openDrawer } from '../../Store/Reducers/OpenDrawerReducer'
import { UpdateUserLevelId } from '../../Store/Action/loginActions';



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
  button: {
    backgroundColor: "#91EEFF !important",
    color: '#656464',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    border: '#707070 solid 1px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  cancel: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    },
    color: '#656464',
    border: '#00000042 solid 1px',
  },
  root: {
    padding: 24
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  media: {
    maxWidth: 100,
    [theme.breakpoints.down(426)]: {
      maxWidth: 90
    },
    marginBottom: 12
  }
}));

const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';
export default function MyCourses(props) {
  // Styles
  const classes = useStyles();

  // Disptach
  const dispatch = useDispatch();

  // Props

  // State
  const [allUserCourses, setAllUserCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showMainCourses, setShowMainCourses] = useState(true);
  const [showDescriptionSubCourse, setShowDescriptionSubCourse] = useState(false);
  const [subCourseData, setSubCourseData] = useState({});
  const [showDescriptionCourse, setShowDescriptionCourse] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [showSubReturnButton, setSubShowReturnButton] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);

  // Redux Get State
  const userData = useSelector(state => state.login);
  const showLegacyModal = useSelector(state => state.legacyCourse.open ? state.legacyCourse.open : false);
  const isInDrawer = useSelector(state => state.legacyCourse.isInDrawer ? state.legacyCourse.isInDrawer : false);
  const legacyDateIndex = useSelector(state => state.legacyCourse.dateIndex);
  const courseName = useSelector(state => state.legacyCourse.courseName);
  const byoDate = useSelector(state => state.legacyCourse.byoDate);
  const guidedPlanAccessLevels = useSelector(state => state.login.guidedPlanAccessLevels);


  // Get Data useEffect
  useEffect(() => {
    axios(AxiosConfig('GET', `/byo/workout/my-courses/users/${userData.UserId}`, userData.webToken))
      .then(res => {
        setAllUserCourses(res.data.courses)
        setDayIndex(res.data.dayIndex)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [userData.UserId, userData.webToken])


  // Handlers
  const handlePreviewCourses = (courseData) => {
    // for legacy course, to open the legacy course modal with todays date
    if (courseData.isLegacy) {
      dispatch(openLegacyWorkoutModal(courseData.classOrExerciseName, dayIndex, true));
      return;
    }

    // to open thrive course drawer
    if (courseData.classOrExerciseName === "Thrive Nutrition") {
      dispatch(openDrawer('Thrive'))
      return;
    }

    if (courseData.relatedWorkouts && courseData.relatedWorkouts.length) {
      // Hide the main course cards and show the preview cards.
      setShowMainCourses(false);

      // Show the Sub courses and show the description of that course;
      setShowDescriptionSubCourse(true);

      // set selected course in object to render the description of that course.
      setSubCourseData(courseData);

    }
    else {
      // Show the course description with video
      setCourseData(courseData);
      setShowDescriptionCourse(true);
      setShowMainCourses(false);

      if (showDescriptionSubCourse) {
        setShowDescriptionSubCourse(false);
        setSubShowReturnButton(true);
      }
    }
  }


  const closeCoursePreview = () => {
    // setPreviewCourse(false);
    // check if sub course description is selected ans reshow all the courses.
    // this if is for returning from a sub course course to show all  the main courses.
    if (showDescriptionSubCourse) {
      setShowDescriptionSubCourse(false);
      setShowMainCourses(true);
      setSubCourseData({});
    }
    else {
      // this is for sub course like elements 1 workout 1 to return to elemnts 1 main grid.
      if (showSubReturnButton) {
        setSubShowReturnButton(false);
        setShowDescriptionCourse(false);
        setShowDescriptionSubCourse(true);
      }
      else {
        setShowDescriptionCourse(false);
        setShowMainCourses(true);
        setCourseData({});
        setSubShowReturnButton(false);
      }
    }
  }

  const history = useHistory();
  const handleSelection = () => {
    if (selectedIndex === 1) {
      dispatch(openDrawer('GuidedPlans'))
    }
    if (selectedIndex === 2) {
      axios(AxiosConfig('PUT', `/myschedule/choose/my-courses/users/${userData.UserId}/level/10`, userData.webToken))
        .then(res => {
          dispatch(UpdateUserLevelId(res.data))
          history.push('/')
        }).catch(err => { })
    }
  }


  return (

    <Wrapper {...props}>
      <Box m={1} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
          <img className={classes.image} src={gfImage} alt="GymFit Logo" />
          <Typography variant='h3' className={classes.title}>
            Your purchases <span role='img' aria-labelledby='finger-down'>👇</span>
          </Typography>
        </Grid>
      </Box>
      <Box mt={6} style={{ width: '100%' }} />
      {
        isLoading
          ? <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
            <CircularProgress />
          </Box>
          : <>
            <Grid container justifyContent='center'>
              <Grid item xs={12} sm={12} md={9} lg={8}>
                <Grid container justifyContent='center'>
                  {
                    showDescriptionSubCourse
                      ? <CoursePreivewData
                        returnToCourses={closeCoursePreview}
                        isSubCoursePreview={showDescriptionSubCourse}
                        {...subCourseData}
                      />
                      : null
                  }
                  {
                    showDescriptionCourse
                      ? <CoursePreivewData
                        returnToCourses={closeCoursePreview}
                        returnToText={showSubReturnButton ? `Return to ${subCourseData.classOrExerciseName}` : null}
                        {...courseData}
                      />
                      : null
                  }
                  {
                    showMainCourses && allUserCourses.length
                      ? allUserCourses.map((courseData, index) => <MyCoursesCard
                        key={index}
                        noAddButton={courseData.relatedWorkouts || courseData.isLegacy}
                        previrewCourse={() => handlePreviewCourses(courseData)}
                        {...courseData}
                      />
                      )
                      : null
                  }
                  {
                    allUserCourses.length <= 0
                      ? <Typography align='center' variant='h6'>Looks Like you dont own any courses! To gain access to all the amazing conent we have to offer please <Link href='https://www.gymnasticbodies.com/subscribe/'>Sign Up For a Premium Membership!</Link></Typography>
                      : null
                  }
                  {
                    showDescriptionSubCourse
                      ? subCourseData.relatedWorkouts.map((courseData, index) => <MyCoursesCard
                        key={index}
                        noAddButton={courseData.relatedWorkouts || courseData.isLegacy}
                        previrewCourse={() => handlePreviewCourses(courseData)}
                        image={courseData.imageUrl}
                        {...courseData}
                      />)
                      : null
                  }
                </Grid>
              </Grid>
            </Grid>
            {
              allUserCourses.length > 0
                ? <>
                  <Box mt={6} style={{ width: '100%' }}>
                    <Grid container justifyContent='center'>
                      {
                        guidedPlanAccessLevels.length > 0
                          ?
                          <Grid xs={6} sm={6} md={4} lg={4} item className={classes.gridItem}>
                            <Grid container justifyContent='center'>
                              <PathSelection image='Initial-GuidedPlans.png' maxDiameter={150} isSelected={selectedIndex === 1} onClick={() => setSelectedIndex(1)} />
                              <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem} style={{ alignItems: 'center' }}>
                                <Typography align='center' variant='h5' style={{ color: '#656464' }}> Do you want to <br />  Follow a Guided Plan? </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          : null
                      }

                      <Grid xs={6} sm={6} md={4} lg={4} item className={classes.gridItem}>
                        <Grid container justifyContent='center'>
                          <PathSelection image='Initial-BYO.png' maxDiameter={150} isSelected={selectedIndex === 2} onClick={() => setSelectedIndex(2)} />
                          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem} style={{ alignItems: 'center' }}>
                            <Typography align='center' variant='h5' style={{ color: '#656464' }}> Build Your Own <br /> Schedule with your courses?</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={6} style={{ width: '100%' }}>
                    <Grid container justifyContent='center'>
                      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
                        <Button size='large' color="primary" disabled={selectedIndex ? false : true} autoFocus className={clsx({ [classes.button]: selectedIndex, [classes.cancel]: !selectedIndex })} onClick={handleSelection}>
                          choose selected
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </>
                : null
            }
          </>
      }
      <LegacyWorkoutModal
        date={byoDate}
        courseName={courseName}
        open={showLegacyModal && isInDrawer}
        dateIndex={legacyDateIndex}
        isBuildYourOwn
      />
    </Wrapper>
  );
}


