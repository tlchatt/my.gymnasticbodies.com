import React from 'react';
import { makeStyles, IconButton, Box, Divider, Card, CardActionArea } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useDispatch } from 'react-redux';

import { resetSingleProg, logIndivdualDays } from '../../../../Store/Action/FreeMemberActions';
import { logIndividualWorkouts,unlogIndividualWorkouts } from '../../../../Store/Action/WorkoutBuilderActions';
import { openOhNo } from '../../../../Store/Reducers/OhNoReducer';
import ButtonGroup from '../CustomButtonGroup'
import {GreenComplete, CompleteIcon} from '../../Drawer/SvgIcons'

import './MobileSample.scss'

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

export default function MediaCardMobile(props) {
  const classes = useStyles();
  const respOrSec = props.repsOrSecs.charAt(props.repsOrSecs.length - 1);
  const dispatch = useDispatch();

  const {
    isLogged,
    dateKey,
    dateKeyIndex,
    isPreviousDay,
    hideRefresh,
    isBuildYourOwn,
    isIndividualVideo,
    isWorkoutAccessable
  } = props;

  const resetSingle = () => {
    dispatch(resetSingleProg(props.autoPilotId, dateKeyIndex, dateKey));
  };


  const logSingle = () => {
    if (isBuildYourOwn) {
      if (isWorkoutAccessable) {
        !isLogged ?
        dispatch(logIndividualWorkouts(dateKeyIndex, dateKey, props.classOrProgOrExId, props.repsOrSecs)) :
        dispatch(unlogIndividualWorkouts(dateKeyIndex, dateKey, props.classOrProgOrExId));
      }
      else {
        dispatch(openOhNo());
      }
    }
    else {
      dispatch(logIndivdualDays(props.autoPilotId , dateKey, props.repsOrSecs));
    }
  };

  const playVideo = () => {
    if (isBuildYourOwn && !isWorkoutAccessable) {
      dispatch(openOhNo());
      return;
    }
    props.openPlayerModal(props, isIndividualVideo)
  };


  return (
    <>
      <Box
        className={`gf-grid ${isBuildYourOwn ? 'gf-left-image' : null}`}
        style={{
          paddingTop: props.noPaddingTop ? 0 : 8,
        }}
      >
        <Box className="gf-grid-title-sections">
          <Typography variant="h5" component="h2" className={classes.cardTitle}>
            {props.category}
          </Typography>
        </Box>
        <Box className="gf-grid-data-section">
          <ButtonGroup disabled={isLogged || isPreviousDay} current={parseInt(props.repsOrSecs)} hasSec={respOrSec === 's'} max={respOrSec === 's' ? 30 : 10} min={respOrSec === 's' ? 5 : 1} {...props} />
          <Typography style={{ color: "#FF9435", paddingRight: 8 }}>
            {props.exerciseName}
          </Typography>
        </Box>
        <Box className="gf-sampler-image-container">
          <Card elevation={4}>
            <CardActionArea className={classes.cardImageAction} onClick={playVideo} disabled={isPreviousDay} >
              <img
                className={classes.media}
                alt={props.type}
                src={`https://gymfit-images.s3.amazonaws.com/exercises/${props.imageUrl.split('.')[0].toUpperCase()}.jpg`}
              />
              <div className={`${classes.overLay}`}>
                <PlayCircleOutlineIcon className={classes.playButtonIcon} />
              </div>
            </CardActionArea>
          </Card>
        </Box>
        <Box className="gf-icon gf-icon-jc-center">
          {
            hideRefresh ? null : <IconButton aria-label="upload picture" component="span" disabled={isLogged || isPreviousDay} onClick={resetSingle} >
              <AutorenewIcon />
            </IconButton>
          }
          <IconButton aria-label="upload picture" component="span" disabled={isPreviousDay} onClick={logSingle} >
            { isLogged ? <GreenComplete /> :  <CompleteIcon />}
          </IconButton>
        </Box>
      </Box>
      {
        props.isBuildYourOwn && props.showDivider ? <Divider variant='fullWidth' className={classes.divider} />  : null
      }
      {
        !props.isBuildYourOwn ? <Divider variant='fullWidth' className={classes.divider} /> : null
      }
    </>
  );
}
