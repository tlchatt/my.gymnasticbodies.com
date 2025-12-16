import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import SingleDayCards from './SingleDayCards'

const useSytles = makeStyles(theme => ({
  padding: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',

  },
  title: {
    marginTop: 0,
    padding: 8,
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: '1.35',
    letterSpacing: '0.07em',
    textAlign: 'center'
  },
  rootOverRide: {
    padding: '24px 0',
    width: '100%',
    margin: '16px',
    maxWidth: '100%',
  }
}))

const ClassesAndPrograms = (tasks, classOverRide, currentDayIndex) => {
  let scheduleClasses = [];
  let schedulePrograms = [];

  tasks.forEach((task, index) => {
    if (task.taskData.type === 'Programs') {
      schedulePrograms = [
        ...schedulePrograms,
        <SingleDayCards
          key={index}
          currentDayIndex={currentDayIndex}
          calId={task.taskId}
          {...task.taskData}
        />
      ];
    }
    else {
      scheduleClasses = [
        ...scheduleClasses,
        <SingleDayCards
          key={index}
          currentDayIndex={currentDayIndex}
          calId={task.taskId}
          {...task.taskData}
        />
      ];
    }
  });

  return (
    <>
      {
        scheduleClasses.length
          ? <Typography variant="h4" style={{ padding: '0 8px' }}>Classes:</Typography>
          : null
      }
      <DialogContent classes={{root: classOverRide}}>
        {
          scheduleClasses.length
            ? scheduleClasses
            : null
        }
      </DialogContent>
      {
        schedulePrograms.length
          ? <Typography variant="h4" style={{ padding: '0 8px' }}>Programs:</Typography>
          : null
      }
      <DialogContent classes={{root: classOverRide}}>
      {
          schedulePrograms.length
            ? schedulePrograms
            : null
      }
      </DialogContent>
    </>
  )
}

function SingleDayModal(props) {
  const classes = useSytles();

  return (
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          paper: classes.rootOverRide
        }}
      >
        <Typography variant='h3' className={classes.title}>
          {props.day} {props.weekDay}
        </Typography>
        {
          props.tasks.length
            ? ClassesAndPrograms( props.tasks, classes.padding, props.currentDayIndex)
            : <Typography variant='h4' align='center'>Rest Day</Typography>
        }
      </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    data: state.calendar
  }
}

export default connect(mapStateToProps)(SingleDayModal);
