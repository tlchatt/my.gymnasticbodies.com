import React from 'react';
import { makeStyles, Box, Card, CardActionArea } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import CompleteButton from './completeButton'

import { logAllBeginnerWorkout,removeBeginnerWorkoutLog, refreshWMS } from '../../../../../Store/Action/LevelsActions'
import { logMainCourses,removeMainCourseLog, openLegacyWorkoutModal } from '../../../../../Store/Action/WorkoutBuilderActions'
import { openOhNo } from '../../../../../Store/Reducers/OhNoReducer'


const useStyles = makeStyles(theme => ({
  media: {
    aspectRatio: '3/2',
    maxWidth: 180,
    width: '100%',
    borderRadius: 4,
  },
  cardTitle: {
    fontWeight: 600,
    color: '#FF9435',
    fontFamily: '"Open Sans", sans-serif',
    textTransform: 'uppercase',
    padding: 4
  },
  overLay: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    fontSize: '3rem',
    opacity: 0.6,
    color: '#ffffff',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      opacity: 1,
      fontSize: '4rem',
    }
  },
  disabled: {
    color: 'green !important',
    backgroundColor: 'rgba(0,200,83,0.2) !important'
  }
}));

export default function CourseCardContent(props) {
  const classes = useStyles();
  const {
    hideComplete,
    showRefresh,
  } = props;

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

  const handlePlayButton = () => {
    if (props.isBuildYourOwn && !props.isWorkoutAccessable) {
      dispatch(openOhNo());
      return;
    }
    if (props.showInLegacyModal) {
      dispatch(openLegacyWorkoutModal(props.title, props.dateKeyIndex));
    } else {
      props.openPlayerModal();
    }
  }

  return (
    <>
      <div className={clsx("gf-grid-levels", {'gf-no-icon' : hideComplete})}>
        <Box className="gf-sampler-image-container">
          <Card elevation={4}>
            <CardActionArea className={classes.cardImageAction} onClick={handlePlayButton}>
              <img
                className={classes.media}
                alt={props.title}
                src={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.image}`}
              />
              <div className={`${classes.overLay}`}>
                <PlayCircleOutlineIcon className={classes.playButtonIcon} />
              </div>
            </CardActionArea>
          </Card>
        </Box>
        <Box className="gf-grid-data-section">
          <Typography variant='h6' style={{ width: '100%', color: '#5D5D5D' }}>
            {props.title}
          </Typography>
          {
            props.showNote && <Typography style={{ color: "#FF9435", paddingRight: 8 }}>
              {props.note}
            </Typography>
          }
        </Box>
        {
          !hideComplete && <CompleteButton isPreviousDay={props.isPreviousDay} handleRefreshLevels={handleRefreshLevels} showRefresh={showRefresh} handleLog={handleLog} isLogged={props.isLogged} disabled={props.showInLegacyModal} />
        }
      </div>
    </>
  );
}
