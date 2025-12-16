import React from 'react';
import { Grid, Box, Typography} from '@material-ui/core';

import Carousel from '../../Carousel';
import DailyViewEmptyCard from '../../DailyViewEmptyCard';
import BeginnerDailyViewCard from '../../BeginnerPlan/MobileViewBeginnerPlan/BeginnerDailyViewCard'
import GenerateLevels from '../../BeginnerPlan/GenerateWorkoutBeginner'

const OPTIONS=['Upper Body', 'Core/Lower body', 'Stretch', 'Core/UpperBody']

export default function DailyView(props) {

  // Setup variables

  // Redux State

  // States

  // props
  const {
    currentDayIndex,
    weekDays,
    workoutSchedule,
  } = props;

    // Helper variables
  const workoutScheduleKeys = Object.keys(workoutSchedule);

  return (
    <Box mt={1} style={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Carousel currentDateIndex={currentDayIndex}>
            {
              weekDays.map((day, index) => {
                let children;
                if (index < currentDayIndex && !workoutSchedule[workoutScheduleKeys[index]]?.length ) {
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

                if (workoutSchedule[workoutScheduleKeys[index]]?.length) {
                  children = (
                    <BeginnerDailyViewCard
                      day={day}
                      workoutData={workoutSchedule[workoutScheduleKeys[index]]}
                      isLevels
                      clearDay
                      key={index}
                      dateKeyIndex={index}
                      dateKey={ workoutScheduleKeys[index]}
                    />
                  )
                }

                if (index >= currentDayIndex && !workoutSchedule[workoutScheduleKeys[index]]?.length) {
                  children = (
                    <DailyViewEmptyCard day={day} key={index} showWatermark={true}>
                      <GenerateLevels
                        text='This is a default Rest Day, but you can add a workout.'
                        options={OPTIONS.map((item, index) => <option key={index} value={index + 1}>{item}</option>)}
                        dateKeyIndex={index}
                        dateKey={workoutScheduleKeys[index]}
                        workoutId={1}
                        isLevels
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
