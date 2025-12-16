import React, {useState, useEffect} from 'react';
import { Grid, makeStyles, Box, Typography} from '@material-ui/core'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import * as Sentry from "@sentry/react";


// Custom Components
// eslint-disable-next-line
import HistoryCalander from '../../HistoryComponents/HistoryCalendar'
import HistoryDayDetails from '../../HistoryComponents/HistoryDayDetails'

const useStyles = makeStyles(theme => ({
  grid: {
    padding: 8,
    [theme.breakpoints.down('xs')]: {
      padding: '8px 0'
    }
  },
  title: {
    color: "#FF9435",
    padding: "24px 0 0",
  },
  containerColor: {
    background: '#eeeeee'
  }
}))

function changeTimezone(date, ianatz) {

  // suppose the date is 12:00 UTC
  var invdate = new Date(date.toLocaleString('en-US', {
    timeZone: ianatz
  }));

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract
}

const API = process.env.REACT_APP_API;

const History = () => {
  const classes = useStyles();
  const userTimeZone = useSelector(state => state.login.timezone)
  const [date, setDate] = useState(changeTimezone(new Date(), userTimeZone));
  const [history, setHistory] = useState();
  const userData = useSelector(state => state.login);
  const handleDetaileHistory = day => setDate(day);

  const getUserHistory = (date) => {
    let config = {
      method: 'get',
      url: `${API}/workout-history/all-access/users/${userData.UserId}?year=${date.getFullYear()}&month=${date.getMonth() + 1}`,
      headers: {
        'Authorization': `Bearer ${userData.webToken}`
      }
    };

    Axios(config).then(res => {
      setHistory(res.data);
    }).catch((err) => {
      Sentry.captureException(err);
    })
  }

  useEffect(() => {
    getUserHistory(date);
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container style={{ marginTop: 16 }}>
      <Box style={{ width: '100%' }}>
        <Typography variant='h4' gutterBottom className={classes.title} id="responsive-dialog-title" align='center'>View Your History</Typography>
      </Box>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <HistoryCalander date={date} handleDetaileHistory={handleDetaileHistory} handleMonth={getUserHistory} history={history} themeColor={true} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
        <HistoryDayDetails date={date} history={history}  customColor/>
      </Grid>
    </Grid>
  )
}

export default React.memo(History);
