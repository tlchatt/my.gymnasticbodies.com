import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment-timezone';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchFreeMember } from '../../../Store/Action/FreeMemberActions';
import { showToast } from '../../../Store/Action/calendarActions'

import { getCalanderDate } from '../../UtilComponents/GetCurrentWeek';
import WeekDayRow from '../WeekDayRow'
import WorkoutPlanner from '../WorkoutSampler'
import EditModal from '../EditCatModal/EditCatModal'
import FavModal from '../AddFavModal'
import LoadFavModal from '../LoadFavModal'

import DailyView from '../AutoPilot/DailyView';


export default function AutoPilot(props) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(813));
  const timeZone = useSelector(state => state.login.timezone);
  const weekDays = getCalanderDate(timeZone, 'dddd, MMMM DD');
  const [openPlayer, setOpenPlayer] = useState({});
  const [openEditModal, setOpenEditModal] = useState({ open: false, dayOfWeek: '' });
  const [openFavModal, setOpenFavModal] = useState({ open: false, workoutData: [] });
  const [openLoadFavModal, setOpenLoadFavModal] = useState({ open: false });

  const dispatch = useDispatch();
  const savedWrokout = useSelector(state => state.freeMember.savedWrokout);
  const dayView = useSelector(state => state.freeMember.dayView);
  const todaysDate = useSelector(state => state.freeMember.todaysDate);
  const weeklyKeys = Object.keys(dayView);


  const currentDate = moment(todaysDate).tz(timeZone).format('dddd, MMMM DD');
  const currentDayIndex = weekDays.findIndex(day => day === currentDate);

  useEffect(() => {
    dispatch(fetchFreeMember());
  }, [dispatch]);

  useEffect(() => {
    if (props.state.view === 'Daily View') {
      setOpenPlayer(false);
    }
  }, [props.state.view]);

  const playWorkout = (dateKey) => {
    setOpenPlayer({
      [dateKey]: openPlayer[dateKey] ? !openPlayer[dateKey] : true
    })
  }

  const forceCloseAllMainPlayers = () => {
    setOpenPlayer({})
  }

  const handleOpenAddFavModal = (workoutData, dateKeyIndex, date) => {
    setOpenFavModal({
      open: true,
      workoutData: workoutData,
      currentDate: date,
      dateKeyIndex
    });
  }

  const handleOpenLoadFavModal = () => {
    if (savedWrokout.length >= 15) {
      setOpenLoadFavModal({ open: true, showEdit: true })
      dispatch(showToast('You have 15 of 15 saved workouts, please delete to add more.', 'error', 5000));
    }
  }

  const handleCloseFavModal = () => {
    setOpenFavModal({ open: false, workoutData: [] });
  }

  const WeeklyView = (dayOfWeek, index) => {
    let children = null;
    let showDvidier = true;
    let showButtons = false;
    let isPreviousDay = false;

    if (!dayView[weeklyKeys[index]] && index < currentDayIndex) {
      children = (
        <Box mb={3} style={{ width: '100%' }}>
          <Typography gutterBottom align='center' variant='h5' style={{ color: '#6C6C6C' }}>
            Rest Day
          </Typography>
        </Box>
      )
    }

    if (dayView[weeklyKeys[index]] && index < currentDayIndex) {
      children = (
        <WorkoutPlanner
          closeMainPlayer={forceCloseAllMainPlayers}
          workoutData={dayView[weeklyKeys[index]].exerciseListForDay}
          rounds={dayView[weeklyKeys[index]].rounds}
          dateKey={weeklyKeys[index]}
          dateKeyIndex={index}
          isLogged={true}
          isPreviousDay={true}
          showRounds={true}
        />
      )
      showButtons = true;
      isPreviousDay = true;
    }


    if (dayView[weeklyKeys[index]] && dayView[weeklyKeys[index]].exerciseListForDay && dayView[weeklyKeys[index]].exerciseListForDay.length && index >= currentDayIndex) {
      children = (
        <WorkoutPlanner
          closeMainPlayer={forceCloseAllMainPlayers}
          workoutData={dayView[weeklyKeys[index]].exerciseListForDay}
          openEditModal={() => setOpenEditModal({ open: true, dayOfWeek: weeklyKeys[index], currentDateIndex: index })}
          rounds={dayView[weeklyKeys[index]].rounds}
          dateKey={weeklyKeys[index]}
          dateKeyIndex={index}
          isLogged={dayView[weeklyKeys[index]] ? dayView[weeklyKeys[index]].isLogged : false}
          checkForFirstLogged={dayView[weeklyKeys[index]]?.exerciseListForDay.find(item => item.isLogged)?.isLogged}
          showRounds={true}
        />
      )
      showButtons = true;
    }

    if (index === 6) showDvidier = false;

    return (
      <WeekDayRow
        openFaveModal={() => handleOpenAddFavModal(dayView[weeklyKeys[index]].exerciseListForDay, index, dayOfWeek)}
        playWorkout={() => playWorkout(weeklyKeys[index])}
        openPlayer={openPlayer[weeklyKeys[index]]}
        isLogged={dayView[weeklyKeys[index]] ? dayView[weeklyKeys[index]].isLogged : false}
        dayOfWeek={dayOfWeek}
        key={index}
        showDivider={showDvidier}
        showButtons={showButtons}
        dateKey={weeklyKeys[index]}
        dateKeyIndex={index}
        openLoadFavModal={() => setOpenLoadFavModal({ open: true, dayOfWeek: weeklyKeys[index], currentDateIndex: index })}
        isOpenInitial={index === currentDayIndex}
        isPreviousDay={isPreviousDay}
        isSavedWorkout={dayView[weeklyKeys[index]]?.favoriteId ? true : false}
      >
        {children}
      </WeekDayRow>
    )
  }

  return (
    <>
      {
        weeklyKeys.length
          ? props.state.view === 'Week View' && !isMobile
            ? <Box mt={2} style={{ width: '100%' }}> {weekDays.map(WeeklyView)} </Box>
            : <DailyView
              weekDays={weekDays}
              weeklyKeys={weeklyKeys}
              currentDateIndex={currentDayIndex}
              isMobile={isMobile}
              workoutData={dayView}
              openEditModal={(dayOfWeek, index) => setOpenEditModal({ open: true, dayOfWeek: dayOfWeek, currentDateIndex: index })}
              openLoadFavModal={(dayOfWeek, index) => setOpenLoadFavModal({ open: true, dayOfWeek: dayOfWeek, currentDateIndex: index })}
              handleOpenAddFavModal={handleOpenAddFavModal}
            />
          : <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%'}} />
      }
      <EditModal {...openEditModal} handleClose={() => setOpenEditModal({ open: false, dayOfWeek: '' })} />
      <FavModal {...openFavModal} handleClose={handleCloseFavModal} handleOpenLoadFavModal={handleOpenLoadFavModal} overRideSave={savedWrokout.length >= 15} />
      <LoadFavModal {...openLoadFavModal} handleClose={() => setOpenLoadFavModal({ open: false })} />
    </>
  );
}
