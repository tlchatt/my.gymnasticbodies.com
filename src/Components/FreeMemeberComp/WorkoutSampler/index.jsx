import React, { useState } from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';


import CourseCards from '../SamplerCard/CourseCards'
import LegacyCards from '../SamplerCard/LegacyCards';
import SamplerCard from '../SamplerCard'

import VideoPlayer from '../PlayerModal/VideoPlayer';
import VideoModal from '../PlayerModal';
import Rounds from './Rounds';
import WorkoutCount from './WorkoutCount';

import LegacyPlayer from '../../LegacyWorkoutModal/LegacyVideoPlayer'


const useStyles = makeStyles(theme => ({
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    marginBottom: theme.spacing(2) - 4,
  },
  gridItem: {
    width: 215,
    padding: 8,
    flexShrink: 0,
  },
  widthFitContent: {
    width: 'fit-content'
  },
  widthEmptyLegacy: {
    width: 250,
  }
}));

const WorkoutPlanner = (props) => {
  const classes = useStyles();
  const [openPlayer, setOpenPlayer] = useState(false);
  const [singelVideo, setSingleVideo] = useState({});
  const initialLegacyState = {
    videoTitle: '',
    steps: '',
    instructions: [],
    focusPoints: '',
    videoUrl: '',
    technicalTips: [],
    open: false
  };
  const [legacyModalPlayer, setLegacyModalPlayer] = useState(initialLegacyState);
  const [hideIcons, setHideIcons] = useState(false);

  const {
    //PC
    closeMainPlayer = () => { setOpenPlayer({}); },
    dateKey,
    dateKeyIndex,
    isPreviousDay,
    showRounds,
    cardType,
    showWorkoutCount,
    hasIdividualWokrouts,
    individiualWorkouts,
    isBuildYourOwn
  } = props;

  const byoRounds = useSelector(state => isBuildYourOwn ? state.buildYourOwn.userSchedule[dateKey].rounds : 0);
  const isAllAccessUser = useSelector(state => state.login.isAllAccessUser);
  let postAWS = useSelector(state => state.login.postAWS);
  console.log("postAWS is:", postAWS)
  const openPlayerModal = (prog, isIndividualVideo = false) => {
    closeMainPlayer();
    setSingleVideo({ ...prog, isIndividualVideo, isBuildYourOwn });
    setOpenPlayer(true);

    if (props.levelsPlayer) {
      setHideIcons(true);
    }
    if (isBuildYourOwn && isIndividualVideo) {
      setHideIcons(false);
    }
  }

  const handleLegacyPlayer = (videoTitle, steps, instructions, focusPoints, videoUrl, technicalTips) => {
    closeMainPlayer();
    setLegacyModalPlayer({
      videoTitle,
      steps,
      instructions,
      focusPoints,
      videoUrl,
      technicalTips,
      open: true
    })
  }

  const CardType = cardType && cardType === 'BeginnerCard' ? CourseCards : SamplerCard;


  return (
    <div className={classes.gridContainer}>
      {showRounds && <Rounds {...props} />}
      {showWorkoutCount && <WorkoutCount {...props} />}
      {
        props.workoutData ? props.workoutData.map((data, index) => {
          return (
            <div
              className={
                clsx(classes.gridItem, {
                  [classes.widthFitContent]: data.workouts || (data.isLegacy && data.chosenProgs.length) || data.trainingType === 'Fundamentals' || data.trainingType === 'Follow Along',
                  [classes.widthEmptyLegacy]: data.isLegacy && !data.chosenProgs.length
                })
              }
              key={index}
            >
              {
                data.isLegacy
                  ? <LegacyCards
                    {...data}
                    workoutIndex={index}
                    dateKey={dateKey}
                    dateKeyIndex={dateKeyIndex}
                    handleLegacyPlayer={handleLegacyPlayer}
                    isBuildYourOwn={isBuildYourOwn}
                    postAWS={postAWS}
                  />
                  : <CardType
                    {...data}
                    openPlayerModal={openPlayerModal}
                    dateKey={dateKey}
                    dateKeyIndex={dateKeyIndex}
                    isPreviousDay={isPreviousDay}
                    isBuildYourOwn={isBuildYourOwn}
                  />
              }
            </div>
          )
        })
          : 'loading'
      }
      {
        hasIdividualWokrouts && isAllAccessUser
          ? <Rounds
            checkForFirstLogged={individiualWorkouts.find(item => item.isLogged)?.isLogged}
            hideSettings
            hideRefresh
            dateKey={dateKey}
            rounds={byoRounds}
            isBuildYourOwn={isBuildYourOwn}
          />
          : null
      }
      {
        hasIdividualWokrouts && isAllAccessUser ? individiualWorkouts.map((data, index) => {
          return <div className={classes.gridItem} key={index} >
            <SamplerCard
              {...data}
              openPlayerModal={openPlayerModal}
              dateKey={dateKey}
              dateKeyIndex={dateKeyIndex}
              isPreviousDay={isPreviousDay}
              isBuildYourOwn={isBuildYourOwn}
              isIndividualVideo
            />
          </div>
        }) : null
      }
      {
        <VideoModal open={openPlayer} handleClose={() => setOpenPlayer(!openPlayer)} {...singelVideo} levelsPlayer={props.levelsPlayer}>
          <VideoPlayer open={openPlayer} singleProg={[singelVideo]} levelsPlayer={props.levelsPlayer} withIcons={hideIcons} isBuildYourOwn={isBuildYourOwn} dateKey={dateKey} />
        </VideoModal>
      }
      {
        legacyModalPlayer.open && <LegacyPlayer playerData={legacyModalPlayer} open={legacyModalPlayer.open} handleClose={() => setLegacyModalPlayer(initialLegacyState)} />
      }
    </div>
  )
}

export default WorkoutPlanner;
