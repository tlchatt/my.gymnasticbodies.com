import React from 'react';
import { Grid, Box, Typography} from '@material-ui/core';

import Carousel from '../../Carousel';
import DailyViewEmptyCard from '../../DailyViewEmptyCard';
import GenerateWorkoutBeginner from '../GenerateWorkoutBeginner'
import BeginnerDailyViewCard from './BeginnerDailyViewCard'

import { areAllSameBool } from '../../../../Store/util';


export default function DailyView(props) {
  // props
  const {
    currentDayIndex,
    weekDays,
    userSchedule,
    setGenerateWorkout
  } = props;

  // Setup variables
  const scheduleKeys = Object.keys(userSchedule);

  // event handlers
  const openGenerateWorkout = (dateKey, dateKeyIndex, workoutId) => {
    setGenerateWorkout({ open: true, dateKey, dateKeyIndex, workoutId });
  }

  return (
    <Box mt={1} style={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Carousel currentDateIndex={currentDayIndex}>
            {
              weekDays.map((day, index) => {
                let children;
                if (index < currentDayIndex && !(userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList?.length) ) {
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

                if (index < currentDayIndex && userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList?.length) {
                  children = (
                    <BeginnerDailyViewCard
                      day={day}
                      workoutData={userSchedule[scheduleKeys[index]].classesList}
                      workoutCount={userSchedule[scheduleKeys[index]].workoutId}
                      isPreviousDay={true}
                    />
                  )
                }

                if (index >= currentDayIndex && userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList) {
                  children = (
                    <BeginnerDailyViewCard
                      day={day}
                      workoutData={userSchedule[scheduleKeys[index]].classesList}
                      workoutCount={userSchedule[scheduleKeys[index]].workoutId}
                      setGenerateWorkout={() => openGenerateWorkout(scheduleKeys[index], index, userSchedule[scheduleKeys[index]].workoutId)}
                      dateKey={scheduleKeys[index]}
                      dateKeyIndex={index}
                      isBeginner
                      isLogged={ userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList ? areAllSameBool(userSchedule[scheduleKeys[index]].classesList, 'isLogged') : null }
                    />
                  )
                }

                if (index >= currentDayIndex && !(userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].classesList) ) {
                  children = (
                    <DailyViewEmptyCard day={day} key={index} showWatermark={true}>
                      <GenerateWorkoutBeginner
                        dateKey={scheduleKeys[index]}
                        dateKeyIndex={index}
                        workoutId={userSchedule[scheduleKeys[index]] && userSchedule[scheduleKeys[index]].workoutId ? userSchedule[scheduleKeys[index]].workoutId : 1}
                      />
                    </DailyViewEmptyCard>
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
