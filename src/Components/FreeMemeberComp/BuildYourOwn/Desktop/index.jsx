// Main Imports
import React, { useState } from 'react';
import { Box, Typography, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
// Util Functions

// Component Import
import WeekdayRow from '../../WeekDayRow';
import WrokoutSampler from '../../WorkoutSampler'
import BYOGenWorkout from '../BYOGenWorkout'
import EditWorkout from '../EditWorkout';

// Redux Actions
import { clearAll, saveWorkout, clearDay, loadScheduleToEdit } from '../../../../Store/Action/WorkoutBuilderActions';

const DekstopBuildYourOwn = (props) => {
  // Setup variables

  // Redux State
  const dispatch = useDispatch();

  // States
  // eslint-disable-next-line
  const [openPlayer, setOpenPlayer] = useState({});
  const [editWorkout, setEditWokrout] = useState({});

  // props
  const { weekDays, workoutSchedule, currentDayIndex, isMobile, handleOpenAddFavModal, openLoadFavModal } = props;

  // Helper variables
  const workoutScheduleKeys = Object.keys(workoutSchedule);
  // handlers
  const forceCloseAllMainPlayers = () => {
    setOpenPlayer({})
  }

  const playWorkout = (dateKey) => {
    setOpenPlayer({
      [dateKey]: openPlayer[dateKey] ? !openPlayer[dateKey] : true
    })
  }


  const showEditWokrout = (dateKey) => {
    setEditWokrout({
      [dateKey]: editWorkout[dateKey] ? !editWorkout[dateKey] : true
    })
  }

  const handleCancelEditMode = (dateKey) => {
    showEditWokrout(dateKey)
    dispatch(clearAll())
  }

  const handleOpenEditMode = (dateKey) => {
    showEditWokrout(dateKey)
    // TODO: Need to add logic to prepopulate the edit mode
    dispatch(loadScheduleToEdit(dateKey))
  }


  return (
    weekDays.map((weekday, index) => {
      let children;
      let showButtons = false;
      const MainWorkouts = workoutSchedule[workoutScheduleKeys[index]].mainWorkouts;
      const IndividiualWorkouts = workoutSchedule[workoutScheduleKeys[index]].individualWorkouts;

      if (index < currentDayIndex && !MainWorkouts?.length ) {
        children = (
          <Box mb={3} style={{ width: '100%' }}>
            <Typography gutterBottom align='center' variant='h5' style={{ color: '#6C6C6C' }}>
              Rest Day
            </Typography>
          </Box>
        )
      }
      if (MainWorkouts?.length || IndividiualWorkouts?.length) {
        showButtons = true;
        children = (
          <WrokoutSampler
            dateKeyIndex={index}
            workoutData={MainWorkouts}
            cardType='BeginnerCard'
            closeMainPlayer={forceCloseAllMainPlayers}
            levelsPlayer
            dateKey={workoutScheduleKeys[index]}
            hasIdividualWokrouts={IndividiualWorkouts.length && true}
            individiualWorkouts={IndividiualWorkouts}
            isBuildYourOwn
          />
        )
      }
      if (index >= currentDayIndex && !(MainWorkouts?.length || IndividiualWorkouts?.length )) {
        children = (
          <BYOGenWorkout
            dateKeyIndex={index}
            dateKey={workoutScheduleKeys[index]}
            showEdit={() => showEditWokrout(workoutScheduleKeys[index])}
            openLoadFavModal={ ()=>  openLoadFavModal(weekday, index)}
          />
        )
      }
      return (
        <WeekdayRow
          key={index}
          dayOfWeek={weekday}
          isMobile={isMobile}
          currentDayIndex={currentDayIndex}
          clearDay
          showButtons={showButtons || editWorkout[workoutScheduleKeys[index]]}
          isOpenInitial={currentDayIndex === index}
          showDivider={index === 6 ? false : true}
          dateKeyIndex={index}
          playWorkout={() => playWorkout(workoutScheduleKeys[index])}
          openPlayer={openPlayer[workoutScheduleKeys[index]]}
          isBuildYourOwn
          levelsPlayer
          isSavedWorkout={ workoutSchedule[workoutScheduleKeys[index]].favoriteId ? true : false}
          dateKey={workoutScheduleKeys[index]}
          openFaveModal={() => handleOpenAddFavModal([...MainWorkouts, ...IndividiualWorkouts], index, weekday)}
          customButtons={
            editWorkout[workoutScheduleKeys[index]]
              ? <>
                <Button variant='contained' onClick={() => handleCancelEditMode(workoutScheduleKeys[index])} style={{ marginRight: 24 }}>Cancel</Button>
                <Button variant='contained' onClick={() => dispatch(clearAll())} style={{ marginRight: 24 }}>Clear All</Button>
                <Button variant='contained' onClick={() => dispatch(saveWorkout(index, workoutScheduleKeys[index], true ,() => showEditWokrout(workoutScheduleKeys[index]) ))}>Save</Button>
              </>
              : <>
                <Button variant='contained' onClick={() => handleOpenEditMode(workoutScheduleKeys[index])} style={{ marginRight: 24 }} disabled={index < currentDayIndex}>edit day</Button>
                <Button variant='contained' onClick={() => dispatch(clearDay(index, workoutScheduleKeys[index]))} disabled={index < currentDayIndex}>Clear day</Button>
              </>
          }
          showEditWokrout={editWorkout[workoutScheduleKeys[index]]}
          EditWorkout={
            <EditWorkout />
          }
        >
          {children}
        </WeekdayRow>
      );
    })
  )
}

export default DekstopBuildYourOwn;
