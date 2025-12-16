import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

import Carousel from '../Carousel';
import DailyViewCard from '../DailyViewCard'
import DailyViewEmptyCard from '../DailyViewEmptyCard'
import GenerateWorkout from '../WorkoutSampler/GenerateWorkout/mobile'


export default function DailyView(props) {
  const {
    currentDateIndex,
    weekDays,
    weeklyKeys,
    workoutData,
    openEditModal,
    handleOpenAddFavModal,
    openLoadFavModal,
    isMobile
  } = props;

  return (
    <Box mt={isMobile ? 0 : 1} style={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Carousel currentDateIndex={currentDateIndex}>
            {
              weekDays.map((day, index) => {
                if (workoutData[weeklyKeys[index]]&& index < currentDateIndex) {
                  return <DailyViewCard
                    day={day}
                    key={index}
                    workoutData={workoutData[weeklyKeys[index]].exerciseListForDay}
                    handleOpenAddFavModal={handleOpenAddFavModal}
                    rounds={workoutData[weeklyKeys[index]].rounds}
                    dateKey={weeklyKeys[index]}
                    dateKeyIndex={index}
                    isLogged={true}
                    isPreviousDay={true}
                    isSavedWorkout={workoutData[weeklyKeys[index]]?.favoriteId ? true : false}
                  />;
                }

                if (workoutData[weeklyKeys[index]] && workoutData[weeklyKeys[index]].exerciseListForDay && workoutData[weeklyKeys[index]].exerciseListForDay.length > 0 && index >= currentDateIndex) {
                  return <DailyViewCard
                    day={day}
                    key={index}
                    openEditModal={() => openEditModal(weeklyKeys[index], index)}
                    workoutData={workoutData[weeklyKeys[index]].exerciseListForDay}
                    handleOpenAddFavModal={handleOpenAddFavModal}
                    rounds={workoutData[weeklyKeys[index]].rounds}
                    dateKey={weeklyKeys[index]}
                    dateKeyIndex={index}
                    isLogged={workoutData[weeklyKeys[index]] ? workoutData[weeklyKeys[index]].isLogged : false}
                    isSavedWorkout={workoutData[weeklyKeys[index]]?.favoriteId ? true : false}
                    checkForFirstLogged={ workoutData[weeklyKeys[index]]?.exerciseListForDay.find(item => item.isLogged)?.isLogged}
                  />;
                }

                if (!workoutData[weeklyKeys[index]] && index < currentDateIndex) {
                  return  (
                    <DailyViewEmptyCard day={day} key={index} showWatermark={true}>
                      <Typography gutterBottom align='center' variant='h5' style={{ color: '#6C6C6C' }}>
                        Rest Day
                      </Typography>
                      </DailyViewEmptyCard>
                  )
                }

                return <DailyViewEmptyCard day={day} key={index} showWatermark={true}><GenerateWorkout openLoadFavModal={() => openLoadFavModal(weeklyKeys[index], index)} dateKey={weeklyKeys[index]} dateKeyIndex={index} /></DailyViewEmptyCard>;
              })
            }
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
