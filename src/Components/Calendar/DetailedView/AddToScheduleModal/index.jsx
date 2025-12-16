import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {connect} from 'react-redux';
import { makeStyles, Typography, Paper } from '@material-ui/core';

import Switches from './Switches';
import * as actions from '../../../../Store/Action'

const useSytles = makeStyles(theme => ({
  buttons: {
    letterSpacing: '0.65px'
  },
  padding: {
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down(415)]: {
      padding: 4
    },
  },
  title: {
    textAlign: 'center',
    margin: '18px 0'
  },
  rootOverRide: {
    padding: '16px 12px',
    width: '90%',
    [theme.breakpoints.down(415)]: {
      margin: '8px',
      width: '100%',
      padding: '8px 4px',
    },
  },
  paper: {
    maxWidth: 150,
    margin: 'auto',
    width: '100%',
    height: '100px'
  },
}))


function AddToScheduleModal (props) {
  const classes = useSytles();
  const [course, setCourse] = React.useState();

  useEffect(() => {
    if (props.mainId) {
      setCourse(props.subCourses.filter(element => element.wp_postid === props.wpId)[0])
    }
    else setCourse(props.courseList.filter(element => element.wp_postid === props.wpId)[0])
  }, [props.wpId, props.courseList, props.subCourses, props.mainId])

  const handleSwitches = (event) => {
    let DayIndexes = course.classInfo.dayIndexes ? course.classInfo.dayIndexes : [] ;
    if (DayIndexes.includes(parseInt(event.target.value))) {
      setCourse({
        ...course,
        classInfo: {
          ...course.classInfo,
          dayIndexes: DayIndexes.filter(item => item !== parseInt(event.target.value))
        }
      })
    }
    else {
      setCourse({
        ...course,
        classInfo: {
          ...course.classInfo,
          dayIndexes: [...DayIndexes, parseInt(event.target.value)]
        }
      })
    }
  }

  const handleSave = () => {
    let obj = {
      courseId: course.wp_postid,
      dayIndexes: course.classInfo.dayIndexes.join(',')
    }

    const allClasses = props.mainId && props.mainId !== 59257 ? [...props.subCourses] : [...props.courseList];
    for (let i = 0; i < allClasses.length; i++){
      if ( allClasses[i].classInfo && allClasses[i].wp_postid === course.wp_postid) {
        allClasses[i] = {
          ...allClasses[i],
          mySchedule: course.classInfo.dayIndexes.length ? 'MySchedule' : '',
          classInfo: {
            ...allClasses[i].classInfo,
            dayIndexes: course.classInfo.dayIndexes
          }
        }
      }
    }
    if (props.mainId && props.mainId !== 59257) {
      let foundIndex = props.courseList.findIndex(mainCourse => mainCourse.wp_postid === props.mainId);
      let mainCourses = [...props.courseList];
      let foundSubIndex = mainCourses[foundIndex].classInfo.workouts.findIndex(subCourse => subCourse.wp_postid === course.wp_postid);

      mainCourses[foundIndex].classInfo.workouts[foundSubIndex] = {
        ...mainCourses[foundIndex].classInfo.workouts[foundSubIndex],
        dayIndexes: [...course.classInfo.dayIndexes]
      }

      let isInSchedule = mainCourses[foundIndex].classInfo.workouts.find(item =>  item.dayIndexes && item.dayIndexes.length > 0) ? true : false;


      mainCourses[foundIndex] = {
        ...mainCourses[foundIndex],
        mySchedule: isInSchedule ? 'MySchedule' : '',
      }

      props.setSubClasses(allClasses);
      props.setClasses(mainCourses);
    }
    else props.setClasses(allClasses);

    props.setUpdatedSchedule(obj)
    props.handleClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth='sm'
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.rootOverRide
      }}
    >
      <Paper className={classes.paper}>
        {
          props.img
            ? <img src={props.img} alt="" width='100%' height='100%' />
            : <img src="https://via.placeholder.com/150x100" alt="" width='100%' />
        }
      </Paper>
      <Typography variant='h4' className={classes.title}>
        {props.title}
      </Typography>
      <DialogContent classes={{
        root: classes.padding
      }}>
        <Switches dayIndexes={course ? course.classInfo.dayIndexes : []} handleSwitches={handleSwitches}/>
      </DialogContent>
      <DialogActions>
        <Button className={classes.buttons} onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          className={classes.buttons}
          onClick={handleSave}
          variant='contained'
          color="primary"
          autoFocus
          disabled={
            course && course.classInfo && course.classInfo.dayIndexes ? false : true
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    courseList: state.classes,
    subCourses: state.subClasses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUpdatedSchedule: (data) => dispatch(actions.UpdateSchedule(data)),
    setClasses: (classes) => dispatch(actions.SetAllClasses(classes)),
    setSubClasses: classes => dispatch(actions.SetAllSubClasses(classes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddToScheduleModal));
