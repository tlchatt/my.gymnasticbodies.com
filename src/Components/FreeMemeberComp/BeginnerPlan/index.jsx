// Main Imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import moment from 'moment-timezone';

// Util Functions
import { getCalanderDate } from '../../UtilComponents/GetCurrentWeek';

// Component Import
import GenerateWorkoutBeginner from './GenerateWorkoutBeginner';
import GenerateWorkoutModal from './GenerateWorkoutModal';
import DekstopViewBeginnerPlan from './Desktop';
import MobileViewBeginnerPlan from './MobileViewBeginnerPlan'

// Redux
import { getBeginnerLevel } from '../../../Store/Action/LevelsActions';

const BegginerPlan = (props) => {
  // Styles

  // Redux
  const dispatch = useDispatch();
  const timeZone = useSelector(state => state.login.timezone);
  const userSchedule = useSelector(state => state.levels.userSchedule);
  const isLoading = Object.keys(userSchedule).length !== 0;

  // Setup variables
  const weekDays = getCalanderDate(timeZone, 'dddd, MMMM DD');
  const currentDate = moment().tz(timeZone).format('dddd, MMMM DD');
  const currentDayIndex = weekDays.findIndex(day => day === currentDate);

  // States
  const [generateWorkout, setGenerateWorkout] = useState({ open: false, dateKey: '', dateKeyIndex: 1, workoutId: 1 });

  // props
  const { isMobile } = props;
  console.log('BegginerPlan props', props)

  console.log('BegginerPlan dispatch', dispatch)
  // useEffect
  useEffect(() => {
    console.log('useEffect dispatch(getBeginnerLevel());')
    dispatch(getBeginnerLevel());
    
  }, [dispatch]);


  return (
    <Box mt={isMobile ? 0 : 2} style={{ width: '100%' }}>
      {
        isLoading
          ? props.state.view === 'Week View' && !isMobile
            ? <DekstopViewBeginnerPlan
              setGenerateWorkout={setGenerateWorkout}
              isMobile={isMobile}
              currentDayIndex={currentDayIndex}
              userSchedule={userSchedule}
              weekDays={weekDays}

            />
            : <MobileViewBeginnerPlan
              setGenerateWorkout={setGenerateWorkout}
              currentDayIndex={currentDayIndex}
              userSchedule={userSchedule}
              weekDays={weekDays}
            />
          : <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
      }
      <GenerateWorkoutModal open={generateWorkout.open} handleClose={() => setGenerateWorkout({ ...generateWorkout, open: false })}>
        <GenerateWorkoutBeginner hideText {...generateWorkout} isInModal handleClose={() => setGenerateWorkout({ ...generateWorkout, open: false })} />
      </GenerateWorkoutModal>
    </Box>
  )
}

export default BegginerPlan;
