import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardHeader, IconButton, CardContent, CardActions, Divider } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useDispatch } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import clsx from 'clsx';

import AreYouSure from '../UtilComponents/AreYouSure';
import VideoPlayer from './PlayerModal/VideoPlayer';
import VideoModal from './PlayerModal'

import { resetAllProg, markAllDone } from '../../Store/Action/FreeMemberActions'

import ButtonGroup from './SamplerCard/CustomButtonGroup'

import SampleCardMobile from './SamplerCard/SamplerCardMobile';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#6C6C6C',
  },
  cardHeader: {
    padding: '8px 12px',
    [theme.breakpoints.down(813)]: {
      padding: 8
    }
  },
  action: {
    margin: 0
  },
  rounds: {
    textTransform: 'uppercase',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    padding: '8px 0',
    color: ' #FF9435',
    fontWeight: 500
  },
  cardAction: {
    justifyContent: 'center',
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
  }
}));

export default function DailyView(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [isFollowAlong, setIsFollowAlong] = useState(false);
  const [singelVideo, setSingleVideo] = useState();

  const { openEditModal, handleOpenAddFavModal, isSavedWorkout,  rounds, dateKey, isLogged, dateKeyIndex, isPreviousDay, checkForFirstLogged} = props
  const dispatch = useDispatch();


  const resetAll = () => {
    dispatch(resetAllProg(dateKeyIndex,dateKey ));
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

  const openPlayerModal = (prog) => {
    setSingleVideo(prog);
    setOpenPlayer(true);
  }



  return (
    <div className={classes.root}>
      <Card style={{ width: 480, borderRadius: 8, minHeight: 710, height: '100%' }} elevation={4}>
        <CardHeader
          title={
            <Typography variant='h5' className={classes.title}>
              {props.day}
            </Typography>
          }
          action={
            <>
              <IconButton style={{ padding: 10 }} onClick={resetAll} disabled={isLogged} >
                <AutorenewIcon style={{ fontSize: 32 }} />
              </IconButton>
              <IconButton color="primary" component="span" onClick={openEditModal} disabled={isLogged}>
                <SettingsIcon style={{ fontSize: 28 }} />
              </IconButton>
              <IconButton disabled={isSavedWorkout} component="span" onClick={()=>handleOpenAddFavModal(props.workoutData, dateKeyIndex, props.day)}>
                { isSavedWorkout ? <StarOutlinedIcon className={classes.isSavedWorkout} /> : <StarOutlineIcon />}
              </IconButton>
            </>
          }
          className={classes.cardHeader}
          classes={{
            action: classes.action,
          }}
        />
        <Divider variant='fullWidth' className={classes.divider} />
        <CardContent style={{ display: 'flex', justifyContent: 'space-between', padding: 12 }}>
          <Button
            startIcon={<PlayArrowIcon />}
            variant='contained'
            className={clsx({[classes.playButton]: !isPreviousDay})}
            onClick={playWorkout}
            disabled={isPreviousDay}
          >
            Play Workout
          </Button>
          <Button
            variant='contained'
            disabled={isPreviousDay || isLogged}
            onClick={() => setOpen(!open)}
          >
            Mark all as done
          </Button>
        </CardContent>
        <CardContent className={classes.rootCard}>
          {
            props.workoutData
              ? props.workoutData.map((x, i) =>
                <SampleCardMobile {...x} key={i} openPlayerModal={openPlayerModal} dateKey={dateKey} dateKeyIndex={dateKeyIndex} isPreviousDay={isPreviousDay} />
              )
              : 'loading'
          }
        </CardContent>
        <CardActions className={classes.cardAction} >
          <ButtonGroup min={1} max={5} isRounds={true} current={rounds} largeText={true} dateKey={dateKey} disabled={isLogged || checkForFirstLogged} />
          <Typography variant='h4' className={classes.rounds}>
            ROUNDS
          </Typography>
        </CardActions>
      </Card>
      <AreYouSure
        open={open}
        handleClose={() => setOpen(!open)}
        message='Mark all Completed?'
        cbMessage='Yes, please.'
        cb={() => dispatch(markAllDone(dateKeyIndex,dateKey))}
      />
      <VideoModal open={openPlayer} isFollowAlong={isFollowAlong} handleClose={closePlayer} {...singelVideo} >
        <VideoPlayer open={openPlayer} singleProg={singelVideo ? [singelVideo] : null} dateKey={dateKey} />
      </VideoModal >
    </div>
  );
}
