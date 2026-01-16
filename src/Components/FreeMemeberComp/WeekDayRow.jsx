import React,  { useState, useEffect }  from 'react';
import { Grid, Divider, Typography, makeStyles, Button, Card } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';

import AreYouSure from '../UtilComponents/AreYouSure';
import { markAllDone } from '../../Store/Action/FreeMemberActions'
import { logAllBeginnerWorkout, clearOutDay } from '../../Store/Action/LevelsActions'
import VideoPlayer from './PlayerModal/VideoPlayer';
import GenerateWorkout from './WorkoutSampler/GenerateWorkout';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#6C6C6C',
    padding: '12px 0px 12px 18px',
    [theme.breakpoints.down('xs')]: {
      padding: '12px 0px',
    },
  },
  divider: {
    backgroundColor: '#7070705c'
  },
  videoGrid: {
    padding: '0 15%',
    [theme.breakpoints.down(1200)]: {
      padding: '0 12px'
    }
  },
  dropDown: {
    display: 'flex',
    alignItems: 'center',
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

function between(x, min, max) {
  return x >= min && x <= max;
}

const WeekRow = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const dispatch = useDispatch();


  const {
    playWorkout,
    openPlayer,
    showButtons,
    isSavedWorkout,
    openFaveModal,
    openLoadFavModal,
    dateKey,
    dateKeyIndex,
    isOpenInitial,
    isLogged,
    isPreviousDay,
    clearDay,
    hideSaved,
    isBeginner,
    customButtons,
    showEditWokrout,
    EditWorkout,
    isBuildYourOwn,
    showMarkAllDone
  } = props;
  console.log("openPlayer in WeekRow:",openPlayer)
  useEffect(() => {
    if (isOpenInitial) {
      setOpenCollapse(true);
    }
  }, [isOpenInitial]);

  const hadnleCallBack = () => {
    if (clearDay)
      return dispatch(clearOutDay(dateKeyIndex))

    if (isBeginner)
      return dispatch(logAllBeginnerWorkout(dateKeyIndex, dateKey));

    return dispatch(markAllDone(dateKeyIndex, dateKey))
  }

  const userLevel = useSelector(state => state.login.levelId);

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container>
          <Grid item xs={12} sm={5} md={5} lg={4} className={classes.dropDown}>
            <Typography variant='h5' className={classes.title}>
              {props.dayOfWeek}
            </Typography>
            <div style={{ flex: 1 }} />
            {
              showButtons && !hideSaved && <IconButton onClick={openFaveModal} disabled={isSavedWorkout}>
                { isSavedWorkout ? <StarOutlinedIcon className={classes.isSavedWorkout} /> : <StarOutlineIcon />}
              </IconButton>
            }
            <IconButton onClick={ ()=>setOpenCollapse(!openCollapse)}>
              { openCollapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
            </IconButton>

          </Grid>
          {/* {
            showButtons
              ? <>
                <Grid item xs={6} sm={3} md={3} lg={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {
                    isBuildYourOwn
                      ? null
                      :  between(userLevel, 2, 4) ? null : <Button
                        startIcon={
                          openPlayer
                            ? <CloseIcon />
                            : <PlayArrowIcon />
                        }
                        variant='contained'
                        className={clsx({
                          [classes.playButton]: !isPreviousDay,
                          [classes.open]: openPlayer
                        })}
                        onClick={playWorkout}
                        disabled={isPreviousDay}
                      >
                        {`${openPlayer ? 'Close' : 'Play'}`} Workout
                      </Button>
                  }
                </Grid>
                <Grid item xs={6} sm={showEditWokrout ? 4 : 4} md={4} lg={5} style={{ display: 'flex', alignItems: 'center', paddingRight: 12, justifyContent: 'flex-end' }}>
                  {
                    clearDay && !customButtons
                      ? <Button variant='contained' onClick={() => setOpen(!open)} >Clear day</Button>
                      : customButtons && !showMarkAllDone
                        ? null
                        : <Button variant='contained' disabled={isPreviousDay || isLogged} onClick={() => setOpen(!open)} >Mark all as done</Button>
                  }
                  {
                    customButtons ? customButtons : null
                  }
                </Grid>
              </>
              : null
          } */}
        </Grid>
        {
          (openPlayer && showButtons && !isBuildYourOwn) &&
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.videoGrid} >
            <Card elevation={6} style={{ margin: '12px auto', maxWidth: 710 }}>
              <VideoPlayer open={openPlayer} dateKey={dateKey} levelsPlayer={props.levelsPlayer} isBeginnerPlan={props.isBeginnerPlan} />
            </Card>
          </Grid>
        }

        <Collapse in={openCollapse || showEditWokrout}>
          {
            showEditWokrout
              ? <Grid item xs={12} sm={12} md={12} lg={12} > {EditWorkout}</Grid>
              : props.children
                ? props.children
                : <GenerateWorkout openLoadFavModal={openLoadFavModal} dateKeyIndex={dateKeyIndex} dateKey={dateKey} />
          }
        </Collapse>
        {
          props.showDivider ? <Divider variant='fullWidth' className={classes.divider} /> : null
        }
      </Grid>
      <AreYouSure
        open={open}
        handleClose={() => setOpen(!open)}
        message={clearDay ? `Clear ${props.dayOfWeek} workout?` :'Mark all Completed?'}
        cbMessage='Yes, please.'
        cb={hadnleCallBack}
      />
    </>
  )
}

export default WeekRow;
