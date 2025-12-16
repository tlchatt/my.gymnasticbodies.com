import React, {useEffect} from 'react';
import Calendar from 'react-calendar';
import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import 'react-calendar/dist/Calendar.css';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import addMonths from './dates';
import CalendarIcons from '../CalendarIcon';
import ThriveHistoryIcon from '../CalendarIcon/thrive';


const useStyles = makeStyles(theme => ({
  calendar: {
    width: '100%',
    border: 'none',
    background: 'transparent'
  },
  tile: {
    padding: 42,
    border: '1px solid #dddddd !important',
    fontSize: 16,
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    position: 'relative',
    '&abbr': {
      position: 'relative',
      top: 8,
    },
    [theme.breakpoints.down('xs')]: {
      padding: '40px 8px 12px'
    }
  },
  calendarIcons: {
    position: 'absolute',
    left: 4,
    bottom: 4
  }
}))


const HistoryCalendar = props => {
  const classes = useStyles();
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firsDay = addMonths(lastDay, -12)

  const { history, themeColor } = props;


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    if (!themeColor) {
      let head = document.head;
      let link = document.createElement("link");

      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = 'blueHistory.css';

      head.appendChild(link);

      return () => { head.removeChild(link); }
    }
    else {
      let head = document.head;
      let link = document.createElement("link");

      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = 'orangeHistory.css';

      head.appendChild(link);

      return () => { head.removeChild(link); }
    }
  }, [themeColor]);

  const handleContent = ({ date }) => {
    let cleanDate = moment(date).format('YYYY-MM-DD');
    let icons = null;
    if (history && history[cleanDate]) {

      let orderedHistory = history[cleanDate].reduce((prev, current) => {
        if (current.courseName ==='Thrive') {
          return [current, ...prev]
        }
        return [...prev, current];
      }, [])

      if (history[cleanDate].length === 1) {
        icons = (<div className={classes.calendarIcons}><CalendarIcons text={orderedHistory[0].courseIcon } /></div>);
      }

      if (history[cleanDate].length === 2) {
        icons = (
          <div className={classes.calendarIcons}>
            <CalendarIcons text={orderedHistory[0].courseIcon }/>
            <CalendarIcons text={orderedHistory[1].courseIcon} />
          </div>
        );
      }

      if (history[cleanDate].length > 2) {
        icons = (
          <div className={classes.calendarIcons}>
            <CalendarIcons text={orderedHistory[0].courseIcon }/>
            <CalendarIcons text="..." />
          </div>
        );
      }
    }

    return icons;
  }

  const renderThrive = ({ date }) => {
    let cleanDate = moment(date).format('YYYY-MM-DD');
    if (history && history[cleanDate]) {
      if (history[cleanDate].some(e => e.courseName === 'Thrive')) {
        return (<div className={classes.calendarIcons}><ThriveHistoryIcon/></div>)
      }
    }
  }

  const handleClassName = ({ date }) => {
    let cleanDate = moment(date).format('YYYY-MM-DD');
    let className = '';

    if (history && history[cleanDate]) {
      className = 'has-history';
    }

    return `gf-fix-date ${classes.tile} ${className}`
   }

  return (
    <Calendar
      className={classes.calendar}
      minDetail='year'
      tileClassName={ !themeColor ? `gf-fix-date ${classes.tile}` : handleClassName }
      maxDate={lastDay}
      minDate={firsDay}
      onClickDay={
        (value, event) => props.handleDetaileHistory(value)
      }
      onClickMonth={(value, event) => props.handleMonth(value)}
      onActiveStartDateChange={(value, event) => {
        if (value.view === 'month') {
          props.handleMonth(value.activeStartDate)
        }
      }}
      tileContent={!themeColor ? handleContent : renderThrive}
      value={props.date}
      formatMonthYear={(local, date) => isMobile ? moment(date).format('MMM YYYY') : moment(date).format('MMMM YYYY')}
    />
  )
}

export default HistoryCalendar;
