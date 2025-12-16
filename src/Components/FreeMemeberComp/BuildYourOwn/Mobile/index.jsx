import React, {useState} from 'react';
import { Grid, Box, Typography} from '@material-ui/core';

import Carousel from '../../Carousel';
import DailyViewEmptyCard from '../../DailyViewEmptyCard';
import BeginnerDailyViewCard from '../../BeginnerPlan/MobileViewBeginnerPlan/BeginnerDailyViewCard'


export default function DailyView(props) {

  // Setup variables

  // Redux State

    // props
    const {
      currentDayIndex,
      weekDays,
      workoutSchedule,
      handleOpenAddFavModal,
      openLoadFavModal
    } = props;


  // States
  const [currentCard, setCurrentCard] = useState(currentDayIndex);

    // Helper variables
  const workoutScheduleKeys = Object.keys(workoutSchedule);


  return (
    <Box mt={1} style={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Carousel changeCard={ setCurrentCard } currentDateIndex={currentDayIndex}>
            {
              weekDays.map((day, index) => {
                let children;

                const MainWorkouts = workoutSchedule[workoutScheduleKeys[index]].mainWorkouts;
                const IndividiualWorkouts = workoutSchedule[workoutScheduleKeys[index]].individualWorkouts;

                if (index < currentDayIndex && !MainWorkouts?.length ) {
                  children = (
                    <DailyViewEmptyCard day={day} key={index} showWatermark={true}>
                      <Box mb={3} style={{ width: '100%' }}>
                        <Typography gutterBottom align='center' variant='h5' style={{ color: '#6C6C6C' }}>
                          Rest Day
                        </Typography>
                      </Box>
                    </DailyViewEmptyCard>
                  )
                }

                if (MainWorkouts?.length  || IndividiualWorkouts?.length) {
                  children = (
                    <BeginnerDailyViewCard
                      day={day}
                      workoutData={MainWorkouts}
                      key={index}
                      dateKeyIndex={index}
                      dateKey={workoutScheduleKeys[index]}
                      isBuildYourOwn
                      openFaveModal={() => handleOpenAddFavModal([...MainWorkouts, ...IndividiualWorkouts], index, day)}
                      hasIdividualWokrouts={IndividiualWorkouts.length && true}
                      individiualWorkouts={IndividiualWorkouts}
                      currentCard={currentCard}
                      disabledEditAndClear={index < currentDayIndex}
                      isSavedWorkout={workoutSchedule[workoutScheduleKeys[index]].favoriteId ? true : false}
                    />
                  )
                }

                if (index >= currentDayIndex && !(MainWorkouts?.length  || IndividiualWorkouts?.length)) {
                  children = (
                    <DailyViewEmptyCard
                      day={day}
                      key={index}
                      showWatermark={true}
                      isBuildYourOwn
                      isDailyView
                      dateKeyIndex={index}
                      dateKey={workoutScheduleKeys[index]}
                      currentCard={currentCard}
                      openLoadFavModal={() => openLoadFavModal(day, index)}
                    />
                  );
                }
                return children
              })
            }
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
