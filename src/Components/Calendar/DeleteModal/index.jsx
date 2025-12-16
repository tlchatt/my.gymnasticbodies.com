import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import * as actions from '../../../Store/Action'

const useStyles = makeStyles(theme => ({
  divider: {
    height: 2,
    margin: 'auto',
    marginBottom: 12,
    backgroundColor: 'black',
    width: '15%'
  },
  dialogActions: {
    paddingBottom: 20,
    justifyContent: 'center'
  },
  button: {
    letterSpacing: 1
  }
}))

function DeleteModal(props) {
  const dayArrayText = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const classes = useStyles();

  const handleDelete = (wpId, taskId, currentDayIndex) => {
    const dayArray = ['MONDAY', 'TUESDAY', "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    const orginalCol = props.data.columns[dayArray[currentDayIndex]];
    const newCol = {
      ...orginalCol,
      taskIds: orginalCol.taskIds.filter(item => item !== taskId)
    }

    let tasks = { ...props.data.tasks };
    // let tasks = props.data.tasks.map(task=> task)
    delete tasks[taskId];

    const newState = {
      ...props.data,
      tasks: {
        ...tasks
      },
      columns: {
        ...props.data.columns,
        [dayArray[currentDayIndex]]: newCol
      }
    }
    props.deleteCourse({ dayIndex: currentDayIndex, postId: wpId }, newState);

    const allClasses = props.parentId && props.parentId !== 59257 ? [...props.subCourses] : [...props.courseList]
    for (let i = 0; i < allClasses.length; i++){
      if (allClasses[i].classInfo && allClasses[i].wp_postid === wpId) {
        let classesDayIndexes = allClasses[i].classInfo.dayIndexes && allClasses[i].classInfo.dayIndexes.length
          ? allClasses[i].classInfo.dayIndexes
          : [];

        allClasses[i] = {
          ...allClasses[i],
          mySchedule: classesDayIndexes.filter(day => day !== currentDayIndex + 1).length ? 'MySchedule' : null ,
          classInfo: {
            ...allClasses[i].classInfo,
            dayIndexes: classesDayIndexes.filter(day => day !== currentDayIndex + 1)
          }
        }
      }
    }
    if (props.parentId  && props.parentId !== 59257) {
      let foundIndex = props.courseList.findIndex(mainCourse => mainCourse.wp_postid === props.parentId);
      let mainCourses = [...props.courseList];
      let foundSubIndex = mainCourses[foundIndex].classInfo.workouts.findIndex(subCourse => subCourse.wp_postid === wpId);

      mainCourses[foundIndex].classInfo.workouts[foundSubIndex] = {
        ...mainCourses[foundIndex].classInfo.workouts[foundSubIndex],
        dayIndexes: mainCourses[foundIndex].classInfo.workouts[foundSubIndex].dayIndexes.filter(day => day !== currentDayIndex + 1)
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

    props.handleClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle align="center" id="alert-dialog-title">{`Delete ${props.title} from ${dayArrayText[props.currentDayIndex]}?`}</DialogTitle>
      <Divider className={classes.divider} variant="middle" />
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.button} onClick={props.handleClose} variant="contained">
          Cancel
        </Button>
        <Button className={classes.button} onClick={() => handleDelete(props.wpId, props.taskId, props.currentDayIndex)} variant="contained" color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCourse: (courseData, newState) => dispatch(actions.DeleteClass(courseData, newState)),
    setClasses: (classes) => dispatch(actions.SetAllClasses(classes)),
    setSubClasses: classes => dispatch(actions.SetAllSubClasses(classes))
  }
}

const mapStateToProps = state => {
  return {
    data: state.calendar,
    courseList: state.classes,
    subCourses: state.subClasses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
