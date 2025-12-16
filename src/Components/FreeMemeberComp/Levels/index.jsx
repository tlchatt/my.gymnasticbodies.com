// Main Imports
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import moment from 'moment-timezone';
import { useDispatch } from 'react-redux';

// Util Functions
import { getCalanderDate } from '../../UtilComponents/GetCurrentWeek';

// Component Import
// import GenerateWorkoutBeginner from './GenerateWorkoutBeginner';
// import GenerateWorkoutModal from './GenerateWorkoutModal';
import DeskTopLevels from './Desktop';
import MobileLevels from './Mobile';
import LegacyEditModal from '../../LegacyEditModal';

// redux
import { getLevelPLan } from '../../../Store/Action/LevelsActions'
import { CloseModal } from '../../../Store/Action/LegacyAction'

const BegginerPlan = (props) => {
  // Styles

  // Setup variables
  const timeZone = useSelector(state => state.login.timezone);
  const weekDays = getCalanderDate(timeZone, 'dddd, MMMM DD');
  const currentDate = moment().tz(timeZone).format('dddd, MMMM DD');
  const currentDayIndex = weekDays.findIndex(day => day === currentDate);
  const dispatch = useDispatch();

  // Redux State
  const workoutSchedule = useSelector(state => state.levels.userSchedule);
  const showEditModal = useSelector(state => state.legacyCourse.showEditModal ? state.legacyCourse.showEditModal : false);
  const date = useSelector(state => state.legacyCourse.date ? state.legacyCourse.date : '');
  const isLoading = Object.keys(workoutSchedule).length !== 0;

  // States

  // props
  const { isMobile } = props;

  // useEffects
  useEffect(() => {
    dispatch(getLevelPLan());
  }, [dispatch])

  const handleCloseEditModal = () => {
    dispatch(CloseModal());
  }


  return (
    <>
      <Box mt={isMobile ? 0 : 2} style={{ width: '100%' }}>
        {
          isLoading
            ? props.state.view === 'Week View' && !isMobile
              ? <DeskTopLevels
                isMobile={isMobile}
                currentDayIndex={currentDayIndex}
                workoutSchedule={workoutSchedule}
                weekDays={weekDays}
              />
              : <MobileLevels
                currentDayIndex={currentDayIndex}
                workoutSchedule={workoutSchedule}
                weekDays={weekDays}
              />
            : <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%'}} />
        }
      </Box>
      <LegacyEditModal open={showEditModal} handleClose={handleCloseEditModal} date={date} isLevels/>
    </>
  )
}

export default BegginerPlan;
