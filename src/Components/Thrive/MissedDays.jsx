import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import _ from 'lodash'
import * as Sentry from "@sentry/react";

import DaySwitches from './DaySwitches.jsx'
import {showToast} from '../../Store/Action/calendarActions'

const useStyles = makeStyles(theme => ({
  divider: {
    height: 2,
    margin: 'auto',
    backgroundColor: 'black',
    width: '15%'
  },
  dialogActions: {
    paddingBottom: 20,
    justifyContent: 'center'
  },
  button: {
    letterSpacing: 1
  }
}))

const MissedDays = props => {
  const classes = useStyles();
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.UserId);
  const [missedDays, setMissedDays] = useState([]);
  const [initialMissedDays, setInitailMissedDays] = useState([])
  const dispatch = useDispatch();
  const { open } = props
  const API = process.env.REACT_APP_API;
  useEffect(() => {
    const getUserData = () => {
      var config = {
        method: 'get',
        url: `${API}/thrive/tasks/missedlog/users/${userId}`,
        headers: {
          'Authorization': `Bearer ${webToken}`
        }
      };
      axios(config).then(res => {
        let obj = res.data

        const arr = Object.keys(obj).map(key => ({ day: key, logged: obj[key] }));
        setMissedDays(arr);
        setInitailMissedDays(arr);
      }).catch(err => Sentry.captureException(err))
    }
    getUserData();
  }, [webToken, userId, open, API]);

  const handleSwitches = (e,day) => {
    let newArray = _.cloneDeep(missedDays);
    let index = newArray.findIndex(item => item.day === day);

    newArray[index] = {
      ...newArray[index],
      logged: !newArray[index].logged
    }

    setMissedDays(newArray);
  }

  const handleSave = () => {
    let days = [];

    missedDays.forEach((day, index) => {
      if (!initialMissedDays[index].logged && day.logged) {
        days.push(day.day);
      }
    })

    var config = {
      method: 'post',
      url: `${API}/thrive/tasks/missedlog/users/${userId}?days=${days.join(',')}`,
      headers: {
        'Authorization': `Bearer ${webToken}`
      }
    };

    axios(config).then(res => {
      dispatch(showToast('Updated Your missed days.', 'success'));
      props.handleClose();
    }).catch(err => {
      Sentry.captureException(err);
      dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'));
      props.handleClose();
    })
  }
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle align="center" id="alert-dialog-title" style={{paddingBottom: 8}}>Missed Some Days?</DialogTitle>
      <Divider className={classes.divider} variant="middle" />
      <DialogContent>
        {
          missedDays.length
            ? <>
                <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', marginBottom: 0 }}>
                  Here are the last {missedDays.length} Day(s) of Thrive. Toggle any days you missed below.
                </DialogContentText>
                {missedDays.map((day, index) => <DaySwitches key={day.day} logged={day.logged} day={day.day} last={missedDays.length === index + 1} handleSwitches={initialMissedDays.length > 0 && initialMissedDays[index].logged ? ()=>{} : handleSwitches} />)}
              </>
            : <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', marginBottom: 0 }}>
                No days have been Logged yet. Log some days and if you miss a day come back here!
              </DialogContentText>
        }
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.button} onClick={props.handleClose} variant="contained">
          Cancel
        </Button>
        <Button className={classes.button} onClick={handleSave} variant="contained" color="primary" disabled={!missedDays.length}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MissedDays;
