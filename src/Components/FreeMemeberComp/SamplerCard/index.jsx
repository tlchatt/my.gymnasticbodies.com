import React from 'react';
import { makeStyles, IconButton} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CardHeader from '@material-ui/core/CardHeader';
import clsx from 'clsx'
import { useDispatch } from 'react-redux';

import { resetSingleProg, logIndivdualDays } from '../../../Store/Action/FreeMemberActions';
import { openOhNo } from '../../../Store/Reducers/OhNoReducer'
import { logIndividualWorkouts,unlogIndividualWorkouts } from '../../../Store/Action/WorkoutBuilderActions';
import ButtonGroup from './CustomButtonGroup'
import {CompleteIcon, GreenComplete} from '../Drawer/SvgIcons'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 200,
    padding: 4,
    minWidth: 160
  },
  media: {
    aspectRatio: '3/2',
    borderRadius: 4,
    boxShadow: theme.shadows[2],
    paddingBottom: `${(2/3) * 100 }%`
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
  cardImageAction: {
    margin: '0 auto',
    maxWidth: 160,
    borderRadius: 4,
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
  disabled: {
    color: 'green !important',
    backgroundColor: 'rgba(0,200,83,0.2) !important'
  },
  cardHeaderButton: {
    padding : 8,
  },
  avatar: {
    marginRight: 4
  },
  noPadding: {
    padding: 0
  },
  smallerWidth: {
    maxWidth: 150
  }
}));


// get last letter of a tring


export default function MediaCard(props) {
  const classes = useStyles();
  const respOrSec = props.repsOrSecs.charAt(props.repsOrSecs.length - 1);
  const dispatch = useDispatch();
  const {
    isLogged,
    isPreviousDay,
    isBuildYourOwn,
    isIndividualVideo,
    isWorkoutAccessable
  } = props;

  const resetSingle = () => {
    dispatch(resetSingleProg(props.autoPilotId, props.dateKeyIndex, props.dateKey ));
  };


  const handleLogging = () => {
    if (isBuildYourOwn) {
      if(isWorkoutAccessable){
        !isLogged
        ? dispatch(logIndividualWorkouts(props.dateKeyIndex, props.dateKey, props.classOrProgOrExId, props.repsOrSecs))
        : dispatch(unlogIndividualWorkouts(props.dateKeyIndex, props.dateKey, props.classOrProgOrExId));
      }
      else{
        dispatch(openOhNo());
      } 
    }
    else {
      dispatch(logIndivdualDays(props.autoPilotId, props.dateKey, props.repsOrSecs ));
    }
  };


  const playVideo = () => {
    if (isBuildYourOwn && !isWorkoutAccessable) {
      dispatch(openOhNo());
      return;
    }
    props.openPlayerModal(props, isIndividualVideo )
  };


  return (
    <Card className={classes.root} elevation={3} square>
      <CardHeader
        avatar={
          !isBuildYourOwn && <IconButton component="span" disabled={isLogged || isPreviousDay} className={clsx(classes.cardHeaderButton)} onClick={resetSingle} >
            <AutorenewIcon />
          </IconButton>
        }
        title={
          <Typography variant="h5" component="h2" align={ isBuildYourOwn ? 'center' : 'left'} className={classes.cardTitle}>
            {props.category}
          </Typography>
        }
        style={{
          width: '100%',
          padding: isBuildYourOwn ? '16px 16px 20px' : '4px',
        }}
        classes={{
          avatar: classes.avatar,
        }}
      />
      <CardActionArea
        className={clsx(classes.cardImageAction, { [classes.smallerWidth]: isBuildYourOwn })}
        onClick={playVideo}
        disabled={isPreviousDay}
      >
        <CardMedia
          className={classes.media}
          image={`https://gymfit-images.s3.amazonaws.com/exercises/${props.imageUrl.split('.')[0].toUpperCase()}.jpg`}
          title="Contemplative Reptile"
        />
        <div className={`${classes.overLay}`}>
          <PlayCircleOutlineIcon className={classes.playButtonIcon} />
        </div>
      </CardActionArea>
      <div className={clsx(classes.cardActions, {[classes.noPadding] : isBuildYourOwn})}>
        <ButtonGroup
          current={parseInt(props.repsOrSecs)}
          hasSec={respOrSec === 's'}
          max={respOrSec === 's' ? 30 : 10}
          min={respOrSec === 's' ? 5 : 1}
          {...props}
          disabled={isLogged || isPreviousDay}
        />
        <Typography style={{color: "#FF9435", fontWeight: 600, width: '100%'}}>
          {props.exerciseName}
        </Typography>
      </div>
      <div className={clsx(classes.cardActions, {[classes.noPadding] : isBuildYourOwn})}>
        <IconButton disabled={isPreviousDay} aria-label="upload picture" component="span" onClick={handleLogging}>
          {isLogged ? <GreenComplete/> : <CompleteIcon /> }
        </IconButton>
      </div>
    </Card>
  );
}
