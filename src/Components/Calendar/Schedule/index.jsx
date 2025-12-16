import React from 'react';
import { Paper } from '@material-ui/core';
import {useSelector} from 'react-redux'

// Custom Imports
import DayContainer from './DayContainer'

// Util Imports
import GetWeekDay from '../../UtilComponents/GetCurrentWeek';

// Style Imports
// Note to others, Using scss in this case so it will be easier to translate styles from WP/PHP to React
import './gfSchedule.scss'

const Schedule = props => {
  const userTImezone = useSelector(state => state.login.timezone)

  const weekDays = GetWeekDay(userTImezone);

  const list = [...Array(7).keys()].map((_, index) =>
    <DayContainer day={index} weekDay={weekDays[index]} key={index} isDetailView={props.isDetailView }/>
  )

  return (
    <Paper elevation={4}>
      <ul className="gf-schedule-root">
        {list}
      </ul>
    </Paper>
  )
}

export default Schedule;
