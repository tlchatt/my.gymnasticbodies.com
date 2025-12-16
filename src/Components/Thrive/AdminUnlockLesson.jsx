import React from 'react';
import {
  Grid,
  Typography,
  Divider
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import moment from 'moment';


const AdminUnlockLesson = props => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} style={{padding:4}}>
          <Typography style={{ padding: '10px 20px' }}>Task {props.taskNo}: {props.description}</Typography>
        </Grid>
        <Grid item xs={8} sm={8} md={4} lg={4} style={{padding:4}}>
          <Typography style={{ padding: '10px 20px' }}>
            {
              props.isTaskOpened ? `Unlocked on ${moment(props.unlockedDate).format('M/DD/YYYY')}` : 'Locked'
            }
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={2} lg={2} style={{ padding: 4, display: 'flex', justifyContent: 'flex-end' }}>
          {
            props.taskNo !== 1
              ? <IconButton aria-label="unlock" color="primary" onClick={() => props.handleUnlockTask(props.taskNo)} disabled={props.isTaskOpened}>
                  <ControlPointIcon />
                </IconButton>
              : null
          }

        </Grid>
      </Grid>
      {
        props.taskNo !== '10' ? <Divider /> : null
      }
    </>
  );

}


export default AdminUnlockLesson;
