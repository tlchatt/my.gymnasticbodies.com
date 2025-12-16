// Main Imports
import React, { useState} from 'react';
import { Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
// Util Functions

// Component Import
import WeekdayRow from '../../WeekDayRow';
import WrokoutSampler from '../../WorkoutSampler'
import GenerateLevels from '../../BeginnerPlan/GenerateWorkoutBeginner'

const OPTIONS=['Upper Body', 'Core/Lower body', 'Stretch', 'Core/UpperBody']

const DekstopLevels = (props) => {
  // Setup variables

  // Redux State
  const showAllOpen = useSelector(state => state.login.showAllOpen)

  // States
  // eslint-disable-next-line
  const [openPlayer, setOpenPlayer] = useState({});

  // props
  const { weekDays, workoutSchedule, currentDayIndex, isMobile } = props;

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


  return (
    weekDays.map((weekday, index) => {
      let children;
      let showButtons = false;

      if (index < currentDayIndex && !workoutSchedule[workoutScheduleKeys[index]]?.length ) {
        children = (
          <Box mb={3} style={{ width: '100%' }}>
            <Typography gutterBottom align='center' variant='h5' style={{ color: '#6C6C6C' }}>
              Rest Day
            </Typography>
          </Box>
        )
      }
      if (workoutSchedule[workoutScheduleKeys[index]]?.length) {
        showButtons = true;
        children = (
          <WrokoutSampler
            dateKeyIndex={index}
            workoutData={workoutSchedule[workoutScheduleKeys[index]]}
            cardType='BeginnerCard'
            closeMainPlayer={forceCloseAllMainPlayers}
            levelsPlayer
            dateKey={workoutScheduleKeys[index]}
          />
        )
      }
      if (index >= currentDayIndex && !workoutSchedule[workoutScheduleKeys[index]]?.length) {
        children = (
          <GenerateLevels
            text='This is a default Rest Day, but you can add a workout.'
            options={OPTIONS.map((item, index) => <option key={index} value={index + 1}>{item}</option>)}
            dateKeyIndex={index}
            dateKey={workoutScheduleKeys[index]}
            workoutId={1}
            isLevels
          />
        )
      }
      return (
        <WeekdayRow
          key={index}
          dayOfWeek={weekday}
          isMobile={isMobile}
          currentDayIndex={currentDayIndex}
          hideSaved
          clearDay
          showButtons={showButtons}
          isOpenInitial={currentDayIndex === index || showAllOpen}
          showDivider={index === 6 ? false : true}
          dateKeyIndex={index}
          playWorkout={() => playWorkout(workoutScheduleKeys[index])}
          openPlayer={openPlayer[workoutScheduleKeys[index]]}
          levelsPlayer
          dateKey={workoutScheduleKeys[index]}
        >
          {children}
        </WeekdayRow>
      );
    })
  )
}

export default DekstopLevels;
