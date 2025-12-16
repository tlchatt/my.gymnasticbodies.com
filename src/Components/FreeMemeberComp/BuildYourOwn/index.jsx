// Main Imports
import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';
import moment from 'moment-timezone';

// Util Functions
import { getCalanderDate } from '../../UtilComponents/GetCurrentWeek';

// Component Import
// import GenerateWorkoutBeginner from './GenerateWorkoutBeginner';
// import GenerateWorkoutModal from './GenerateWorkoutModal';
import DesktopBYO from './Desktop';
import MobileBYO from './Mobile';
import LegacyWorkoutModal from '../../LegacyWorkoutModal';
import FavModal from '../AddFavModal'
import LoadFavModal from '../LoadFavModal'

// redux
import { getBYODashoard } from '../../../Store/Action/WorkoutBuilderActions';
import { showToast } from '../../../Store/Action/calendarActions'


const BuildYourOwn = (props) => {
  // Styles

  // Setup variables
  const timeZone = useSelector(state => state.login.timezone);
  const weekDays = getCalanderDate(timeZone, 'dddd, MMMM DD');
  const currentDate = moment().tz(timeZone).format('dddd, MMMM DD');
  const currentDayIndex = weekDays.findIndex(day => day === currentDate);
  const dispatch = useDispatch();

  // Redux State
  const workoutSchedule = useSelector(state => state.buildYourOwn.userSchedule);
  const showLegacyModal = useSelector(state => state.legacyCourse.open ? state.legacyCourse.open : false);
  const isInDrawer = useSelector(state => state.legacyCourse.isInDrawer ? state.legacyCourse.isInDrawer : false);
  const legacyDateIndex = useSelector(state => state.legacyCourse.dateIndex);
  const courseName = useSelector(state => state.legacyCourse.courseName);
  const byoDate = useSelector(state => state.legacyCourse.byoDate);
  const savedWorkout = useSelector(state => state.buildYourOwn.savedWorkouts);
  const isLoading = workoutSchedule ? true: false;

  // States
  const [openFavModal, setOpenFavModal] = useState({ open: false, workoutData: [] });
  const [openLoadFavModal, setOpenLoadFavModal] = useState({ open: false });

  // props
  const { isMobile } = props;

  // useEffects
  useEffect(() => {
    dispatch(getBYODashoard());
  }, [dispatch]);


  const handleOpenAddFavModal = (workoutData, dateKeyIndex, date) => {
    // add some kind of logic when favourites are loaded to check which modal to open
    // will most likly be stored in redux store
    // will hard code for now
    // if (savedWrokout.length >= 15) {
    //   setOpenLoadFavModal({ open: true, showEdit: true })
    //   dispatch(showToast('You have 15 of 15 saved workouts, please delete to add more.', 'error', 3000));
    // }

    setOpenFavModal({
      open: true,
      workoutData: workoutData,
      currentDate: date,
      dateKeyIndex
    });
  }

  const handleCloseFavModal = () => {
    setOpenFavModal({ open: false, workoutData: [] });
  }

  const handleOpenLoadFavModal = () => {
    if (savedWorkout.length >= 15) {
      setOpenLoadFavModal({ open: true, showEdit: true })
      dispatch(showToast('You have 15 of 15 saved workouts, please delete to add more.', 'error', 5000));
    }
  }



  return (
    <>
      <Box mt={isMobile ? 0 : 2} style={{ width: '100%' }}>
        {
          isLoading
            ? props.state.view === 'Week View' && !isMobile
              ? <DesktopBYO
                isMobile={isMobile}
                currentDayIndex={currentDayIndex}
                workoutSchedule={workoutSchedule}
                weekDays={weekDays}
                handleOpenAddFavModal={handleOpenAddFavModal}
                openLoadFavModal={(dayOfWeek, index) => setOpenLoadFavModal({ open: true, dayOfWeek: dayOfWeek, currentDateIndex: index })}
              />
              : <MobileBYO
                currentDayIndex={currentDayIndex}
                workoutSchedule={workoutSchedule}
                weekDays={weekDays}
                handleOpenAddFavModal={handleOpenAddFavModal}
                openLoadFavModal={(dayOfWeek, index) => setOpenLoadFavModal({ open: true, dayOfWeek: dayOfWeek, currentDateIndex: index })}
              />
            : <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%'}} />
        }
      </Box>
      <LegacyWorkoutModal
        date={byoDate}
        courseName={courseName}
        open={showLegacyModal && !isInDrawer}
        dateIndex={legacyDateIndex}
        isBuildYourOwn
      />
      <FavModal
        {...openFavModal}
        handleClose={handleCloseFavModal}
        handleOpenLoadFavModal={handleOpenLoadFavModal}
        overRideSave={savedWorkout.length >= 15}
        isBuildYourOwn
      />
      <LoadFavModal
        {...openLoadFavModal}
        handleClose={() => setOpenLoadFavModal({ open: false })}
        isBuildYourOwn
      />
    </>
  )
}

export default BuildYourOwn;
