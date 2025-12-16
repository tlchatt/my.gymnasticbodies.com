// Main Imports
import React, { useState } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// Util Functions

// Component Import
import WeekdayRow from '../../WeekDayRow';
import WrokoutSampler from '../../WorkoutSampler'
import GenerateWorkoutBeginner from '../GenerateWorkoutBeginner';

// Redux Actions
import { clearOutDayBeginner } from '../../../../Store/Action/LevelsActions'

const areAllSameBool = (arr, name) => {
  const first = arr[0][name];
  return arr.every(item => item[name] === first) ? first : false;
}

const DekstopViewBeginnerPlan = (props) => {
  // props
  const { weekDays, currentDayIndex, setGenerateWorkout, isMobile, userSchedule } = props;

  // Setup variables
  const scheduleKeys = Object.keys(userSchedule);

  // Redux State
  const dispatch = useDispatch();

  // States
  const [openPlayer, setOpenPlayer] = useState({});

  // event handlers
  const openGenerateWorkout = (dateKey, dateKeyIndex, workoutId) => {
    setGenerateWorkout({open: true, dateKey, dateKeyIndex, workoutId });
  }

  const playWorkout = (dateKey) => {
    setOpenPlayer({
      [dateKey]: openPlayer[dateKey] ? !openPlayer[dateKey] : true
    })
  }

  const forceCloseAllMainPlayers = () => {
    setOpenPlayer({})
  }

  const handleClearThisDay = (dayIndex) => {
    dispatch(clearOutDayBeginner(dayIndex))
  }

  return (
    userSchedule && weekDays.map((weekday, index) => {
      let children;
      let showButtons = false;
      let isPreviousDay = false;

      const isLogged = userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList ? areAllSameBool(userSchedule[scheduleKeys[index]].classesList, 'isLogged') : null;


      if (index < currentDayIndex && !(userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList) ) {
        children = (
          <Box mb={3} style={{ width: '100%' }}>
            <Typography gutterBottom align='center' variant='h5' style={{ color: '#6C6C6C' }}>
              Rest Day
            </Typography>
          </Box>
        )
      }
      if (index < currentDayIndex && userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList) {
        isPreviousDay = true;
        showButtons = true;
        children = (
          <WrokoutSampler
            dateKey={scheduleKeys[index]}
            dateKeyIndex={index}
            workoutData={userSchedule[scheduleKeys[index]].classesList}
            cardType='BeginnerCard'
            showWorkoutCount={true}
            workoutCount={userSchedule[scheduleKeys[index]].workoutId}
            isPreviousDay={true}
          />
        )
      }
      if (index >= currentDayIndex && userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList) {
        showButtons = true;
        children = (
          <WrokoutSampler
            dateKey={scheduleKeys[index]}
            dateKeyIndex={index}
            workoutData={userSchedule[scheduleKeys[index]].classesList}
            cardType='BeginnerCard'
            showWorkoutCount={true}
            workoutCount={userSchedule[scheduleKeys[index]].workoutId}
            openGenerateWorkout={() => openGenerateWorkout(scheduleKeys[index], index, userSchedule[scheduleKeys[index]].workoutId)}
            closeMainPlayer={forceCloseAllMainPlayers}
            levelsPlayer
          />
        )
      }
      if (index >= currentDayIndex && !(userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList)) {
        children = (
          <GenerateWorkoutBeginner
            dateKey={scheduleKeys[index]}
            dateKeyIndex={index}
            workoutId={userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].workoutId ? userSchedule[scheduleKeys[index]].workoutId : 1}
          />
        );
      }
      if (index > currentDayIndex && !(userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList) ) {
        children = (
          <GenerateWorkoutBeginner
            dateKey={scheduleKeys[index]}
            dateKeyIndex={index}
            workoutId={userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].workoutId ? userSchedule[scheduleKeys[index]].workoutId : 1}
          />
        );
      }
      return (
        <WeekdayRow
          key={index}
          dayOfWeek={weekday}
          isMobile={isMobile}
          currentDayIndex={currentDayIndex}
          isOpenInitial={index === currentDayIndex}
          isPreviousDay={isPreviousDay}
          showButtons={showButtons}
          hideSaved
          showDivider={index === 6 ? false : true}
          isLogged={isLogged}
          isBeginner
          dateKey={scheduleKeys[index]}
          dateKeyIndex={index}
          levelsPlayer
          playWorkout={() => playWorkout(scheduleKeys[index])}
          openPlayer={openPlayer[scheduleKeys[index]]}
          isBeginnerPlan
          customButtons={userSchedule[scheduleKeys[index]] ? <Button variant='contained' disabled={isPreviousDay || isLogged} style={{ marginLeft: 24 }} onClick={() => handleClearThisDay(index)}>Clear Day</Button> : null}
          showMarkAllDone
        >
          {children}
        </WeekdayRow>
      );
    })
  )
}

export default DekstopViewBeginnerPlan;
