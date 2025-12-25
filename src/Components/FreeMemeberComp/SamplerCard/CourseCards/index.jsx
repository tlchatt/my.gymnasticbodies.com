import React from 'react';
import { makeStyles, IconButton} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { CompleteIcon, GreenComplete } from '../../Drawer/SvgIcons'

import CourseCardContent from './CourseCardContent';

import { logAllBeginnerWorkout,removeBeginnerWorkoutLog, refreshWMS } from '../../../../Store/Action/LevelsActions'
import { logMainCourses,removeMainCourseLog, openLegacyWorkoutModal } from '../../../../Store/Action/WorkoutBuilderActions'

import { openOhNo } from '../../../../Store/Reducers/OhNoReducer';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // maxWidth: 200,
    padding: 4,
    minWidth: 175,
    minHeight: 299
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: '100%',
    padding: '4px 0'
  },
  cardTitle: {
    fontWeight: 600,
    color: '#FF9435',
    fontFamily: '"Open Sans", sans-serif',
    textTransform: 'uppercase'
  },
  disabled: {
    color: 'green !important',
    backgroundColor: 'rgba(0,200,83,0.2) !important'
  },
  avatar: {
    marginRight: 4
  },
  multiCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardHeaderButton: {
    padding : 4,
  },
  refreshButton: {
    padding: 8,
  }
}));


// get last letter of a tring


export default function CourseCards(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleLog = () => {
    if (props.isBuildYourOwn) {
      if (props.isWorkoutAccessable) {
        !props.isLogged ? dispatch(logMainCourses(props.dateKeyIndex, props.dateKey, props.classOrProgOrExId)) :
        dispatch(removeMainCourseLog(props.dateKeyIndex, props.dateKey, props.classOrProgOrExId));
      }
      else {
        dispatch(openOhNo());
      }
    }
    else {
      if(!props.isLogged){
        dispatch(logAllBeginnerWorkout(props.dateKeyIndex, props.dateKey, [props.classId]));
      }
      else{
        dispatch(removeBeginnerWorkoutLog(props.dateKeyIndex, props.dateKey, props.classId));
      }
    }
  }

  const handleRefreshLevels = () => {
    dispatch(refreshWMS(props.scheduleId, props.trainingType, props.dateKeyIndex, props.dateKey));
  }

  const playVideo = () => {
    if (props.isBuildYourOwn && !props.isWorkoutAccessable) {
      dispatch(openOhNo());
      return;
    }
    if (props.showInLegacyModal) {
      dispatch(openLegacyWorkoutModal(props.className, props.dateKeyIndex));
    } else {
      props.openPlayerModal(props)
    }
  };
  return (
    <Card className={classes.root} elevation={3} square>
      <CardHeader
        avatar={
          props.showRefresh && <IconButton onClick={handleRefreshLevels} component="span" className={classes.cardHeaderButton}>
            <AutorenewIcon />
          </IconButton>
        }
        title={
          <Typography variant="h5" align={props.showRefresh ? 'left' : 'center'} className={classes.cardTitle}>
            {props.trainingType}
          </Typography>
        }
        style={{
          width: '100%',
        }}
        classes={{
          avatar: classes.avatar,
          root: clsx({ [classes.refreshButton]: props.showRefresh})
        }}
      />
      {
        props.workouts && props.workouts.length
          ? <div className={classes.multiCard}>
            {props.workouts.map((workout, index) => <CourseCardContent key={index} title={workout.title} image={workout.image} extraMargin divider={ index < props.workouts.length - 1} />)}
          </div>
          : <CourseCardContent playVideo={playVideo} showNote={props.caption} title={props.className} image={props.image} isPreviousDay={props.isPreviousDay}/>
      }
      <div className={classes.cardActions}>
        <IconButton disabled={props.isPreviousDay || props.showInLegacyModal} aria-label="upload picture" component="span" onClick={handleLog}>
          {props.isLogged ? <GreenComplete/> : <CompleteIcon /> }
        </IconButton>
      </div>
    </Card>
  );
}
