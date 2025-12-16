import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardHeader, IconButton, CardContent, CardActions, Divider } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import AreYouSure from '../../../../UtilComponents/AreYouSure';
import VideoPlayer from '../../../PlayerModal/VideoPlayer';
import VideoModal from '../../../PlayerModal'
import EditBuildYourOwn from '../../../BuildYourOwn/EditWorkout'

import LegacyPlayer from '../../../../LegacyWorkoutModal/LegacyVideoPlayer'

import CourseCardsMobile from '../CourseCardMobile';

import { logAllBeginnerWorkout, clearOutDay, clearOutDayBeginner } from '../../../../../Store/Action/LevelsActions'
import { clearAll, clearDay as byoClearDay, loadScheduleToEdit, saveWorkout as byoSaveWokrout } from '../../../../../Store/Action/WorkoutBuilderActions'

import SampleCardMobile from '../../../SamplerCard/SamplerCardMobile'
import ButtonGroup from '../../../SamplerCard/CustomButtonGroup'

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#6C6C6C',
  },
  cardHeader: {
    padding: '12px 16px',
    [theme.breakpoints.down(426)]: {
      padding: 8,
    }
  },
  action: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rounds: {
    textTransform: 'uppercase',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    padding: '8px 0',
    color: ' #656464',
    fontWeight: 500
  },
  cardAction: {
    justifyContent: 'center',
    paddingBottom: 0
  },
  divider: {
    margin: '0 18px',
    backgroundColor: '#D0D0D0'
  },
  button: {
    background: "linear-gradient(18deg, #fcb14e 0%, #f05621 100%)",
    color: 'white',
    padding: '4px 30px',
    fontSize: '18px',
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 12,
    [theme.breakpoints.down('xs')]: {
      padding: '12px 8px',
    }
  },
  rootCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 16px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 8px',
    }
  },
  isSavedWorkout: {
    color: '#FFF2A8',
    stroke: "#656464",
    strokeWidth: "1px",
    strokeLinejoin: "round",
    fontSize: 24
  },
  playButton: {
    color: 'white',
    background: '#1CC700 !important'
  },
  saveButton: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    },
    color: '#656464',
    border: '#707070 solid 1px',
  }
}));

function between(x, min, max) {
  return x >= min && x <= max;
}

export default function DailyView(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [isFollowAlong, setIsFollowAlong] = useState(false);
  const [singelVideo, setSingleVideo] = useState();
  const dispatch = useDispatch();

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
  const [editMode, setEditMode] = useState(false);

  const userLevel = useSelector(state => state.login.levelId);

  const {
    dateKey,
    dateKeyIndex,
    isPreviousDay,
    setGenerateWorkout,
    isLevels,
    clearDay,
    isLogged,
    isBeginner,
    isBuildYourOwn,
    isSavedWorkout,
    openFaveModal,
    hasIdividualWokrouts,
    individiualWorkouts,
    currentCard,
    disabledEditAndClear
  } = props;

  const byoRounds = useSelector(state => isBuildYourOwn ? state.buildYourOwn.userSchedule[dateKey].rounds : 0);
  const isAllAccessUser = useSelector(state => state.login.isAllAccessUser);

  useEffect(() => {
    if (editMode) {
      setEditMode(false);
      dispatch(clearAll());
    }
     // eslint-disable-next-line
   }, [dispatch, currentCard])

  const hadnleCallBack = () => {
    if (clearDay) {
      return dispatch(clearOutDay(dateKeyIndex))
    }

    if (isBeginner) {
      return dispatch(logAllBeginnerWorkout(dateKeyIndex, dateKey));
    }
  }

  const playWorkout = () => {
    setOpenPlayer(!openPlayer)
    setIsFollowAlong(!isFollowAlong);
  }

  const closePlayer = () => {
    setOpenPlayer(!openPlayer)
    setIsFollowAlong(false);
    setSingleVideo();
  }

  const openPlayerModal = (prog, isIndividualVideo = false) => {
    setSingleVideo({...prog, isIndividualVideo, isBuildYourOwn});
    setOpenPlayer(true);
  }


  const handleLegacyPlayer = (videoTitle, steps, instructions, focusPoints, videoUrl, technicalTips) => {
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

  const RenderCardActions = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEditMode = () => {
      setEditMode(!editMode);
      dispatch(loadScheduleToEdit(dateKey))
      handleClose();
    }

    const handleReset = () => {
      dispatch(clearAll());
      handleClose();
    }

    const handleCancelEditMode = () => {
      setEditMode(!editMode);
      dispatch(clearAll());
    }

    const handleClearDay = () => {
      dispatch(byoClearDay(dateKeyIndex, dateKey));
      handleClose();
    }


    const handleClearDayBeginner = () => {
      dispatch(clearOutDayBeginner(dateKeyIndex));
      handleClose();
    }


    let component;

    if (isLevels ) {
      component = (
        !between(userLevel, 2, 4)&&
        <Button
          startIcon={<PlayArrowIcon />}
          variant='contained'
          className={clsx({ [classes.playButton]: !isPreviousDay })}
          onClick={playWorkout}
        >
          Play Workout
        </Button>
      )
    }
    else if (isBuildYourOwn) {
      component = (
        <>
          <IconButton disabled={isSavedWorkout} onClick={openFaveModal}>
            {isSavedWorkout ? <StarOutlinedIcon className={classes.isSavedWorkout} /> : <StarOutlineIcon />}
          </IconButton>
          <IconButton color="primary" component="span" onClick={handleClick} disabled={disabledEditAndClear}>
            <SettingsIcon style={{ fontSize: 24 }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ top: '25px' }}
          >
            {
              editMode
                ?
                [
                  <MenuItem key='close edit' onClick={handleCancelEditMode}>Cancel</MenuItem>,
                  <MenuItem key='clear all' onClick={handleReset}>Clear All</MenuItem>
                ]
                :
                [
                  <MenuItem key='Edit Workout' onClick={handleEditMode}>Edit Workout</MenuItem>,
                  <MenuItem key='Clear This Day' onClick={handleClearDay}>Clear This Day</MenuItem>
                ]

            }
          </Menu>
        </>
      )
    }
    else {
      component = (
        <>
          <Typography variant='h6' className={classes.title}>
            Workout {props.workoutCount}
          </Typography>
          <IconButton color="primary" component="span" onClick={handleClick}>
            <SettingsIcon style={{ fontSize: 24 }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ top: '25px' }}
          >
            <MenuItem key='Edit Workout' onClick={setGenerateWorkout} disabled={isPreviousDay}>Edit Workout</MenuItem>
            <MenuItem key='Clear This Day' onClick={handleClearDayBeginner}>Clear This Day</MenuItem>
          </Menu>
        </>
      )
    }
    return component;
  }

  const handleSaveWorkout = () => {
    dispatch(byoSaveWokrout(dateKeyIndex, dateKey))
    setEditMode(false);
  }

  return (
    <div className={classes.root}>
      <Card style={{ width: 480, borderRadius: 8, minHeight: 710, height: '100%' }} elevation={4}>
        <CardHeader
          title={
            <Typography variant='h5' align={isLevels && between(userLevel, 2, 4) ? 'center' : 'left'} className={classes.title}>
              {props.day}
            </Typography>
          }
          action={<RenderCardActions />}
          className={classes.cardHeader}
          classes={{
            action: classes.action,
          }}
        />
        {
          !isBuildYourOwn && <CardContent style={{ display: 'flex', justifyContent: 'center', padding: isLevels ? 0 : 16, paddingTop: isLevels ? 4 : 0 }}>
            {
              !isLevels && <Button
                startIcon={<PlayArrowIcon />}
                variant='contained'
                className={clsx({ [classes.playButton]: !isPreviousDay })}
                disabled={isPreviousDay}
                onClick={playWorkout}
              >
                Play Workout
              </Button>
            }
          </CardContent>
        }
        <Divider variant='fullWidth' className={classes.divider} />
        <CardContent className={classes.rootCard}>
          {
            editMode && isBuildYourOwn ? <EditBuildYourOwn isMobileMode /> : null
          }
          {
            props.workoutData && !(editMode && isBuildYourOwn)
              ? props.workoutData.map((x, i) => <CourseCardsMobile
                {...x}
                workoutIndex={i}
                openPlayerModal={openPlayerModal}
                key={i} dateKey={dateKey}
                dateKeyIndex={dateKeyIndex}
                isPreviousDay={isPreviousDay}
                handleLegacyPlayer={handleLegacyPlayer}
                isBuildYourOwn={isBuildYourOwn}
                showDivider={
                  isBuildYourOwn
                    ? hasIdividualWokrouts && isAllAccessUser
                      ? true
                      : i !== props.workoutData.length - 1
                    : true
                }
              />
              )
              : null
          }
          {
            hasIdividualWokrouts && isAllAccessUser && !(editMode && isBuildYourOwn)
              ? <CardActions className={classes.cardAction}>
                <ButtonGroup
                  isBuildYourOwn={isBuildYourOwn}
                  isMobileMode
                  min={1}
                  max={5}
                  isRounds={true}
                  current={byoRounds}
                  largeText={true}
                  dateKey={dateKey}
                  disabled={
                    individiualWorkouts.find(item => item.isLogged)?.isLogged
                    || individiualWorkouts.filter(item => !item.isWorkoutAccessable).length > 0
                  }
                />
                <Typography variant='h5' className={classes.rounds}>
                  ROUNDS
                </Typography>
              </CardActions>
              : null
          }
          {
            hasIdividualWokrouts && isAllAccessUser && !(editMode && isBuildYourOwn)
              ? individiualWorkouts.map((x, i) => <SampleCardMobile
                {...x}
                key={i}
                openPlayerModal={openPlayerModal}
                dateKey={dateKey}
                dateKeyIndex={dateKeyIndex}
                isPreviousDay={isPreviousDay}
                hideRefresh
                isBuildYourOwn={isBuildYourOwn}
                isIndividualVideo
                showDivider={i !== individiualWorkouts.length - 1}
                noPaddingTop={i === 0}
              />)
              : null
          }
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
          {
            editMode && isBuildYourOwn
              ? <Button
                size='large'
                className={classes.saveButton}
                onClick={handleSaveWorkout}
              >
                Save
              </Button>
              : null
          }
          {
            isBuildYourOwn
              ? null
              : <Button
                className={classes.saveButton}
                size='large'
                onClick={
                  () => setOpen(true)
                }
                disabled={isPreviousDay || isLogged}
              >
                {clearDay ? 'Clear Day' : "Mark all as done"}
              </Button>
          }
        </CardActions>
      </Card>
      <AreYouSure
        open={open}
        handleClose={() => setOpen(!open)}
        message={clearDay ? `Clear ${props.day} workout?` : 'Mark all Completed?'}
        cbMessage='Yes, please.'
        cb={hadnleCallBack}
      />
      {
        openPlayer && <VideoModal open={openPlayer} isFollowAlong={isFollowAlong} handleClose={closePlayer} {...singelVideo} levelsPlayer>
          <VideoPlayer open={openPlayer} singleProg={singelVideo ? [singelVideo] : null} dateKey={dateKey} isBeginnerPlan={props.isBeginner} levelsPlayer withIcons={!isFollowAlong} isBuildYourOwn={isBuildYourOwn} />
        </VideoModal >
      }
      {
        legacyModalPlayer.open && <LegacyPlayer playerData={legacyModalPlayer} open={legacyModalPlayer.open} handleClose={() => setLegacyModalPlayer(initialLegacyState)} />
      }
    </div>
  );
}
