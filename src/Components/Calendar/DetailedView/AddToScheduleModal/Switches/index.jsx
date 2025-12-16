import React from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Aux from '../../../../../HOC/aux'

const useSytles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  switches: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  span: {
    marginBottom: '12px',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'center',
    fontSize: '12px',
    fontFamily: "'Open Sans', sans-serif",
    textTransform: 'uppercase'
  },
  toggle: {
    margin: 0
  }
}))


export default function Switches(props) {
  const classes = useSytles();
  const dayArray = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  return (
    <div className={classes.row}>
      {
        dayArray.map((day, index) => (
            <Aux  key={index}>
              <div className={classes.switches}>
                <span className={classes.span}>{day}</span>
              <FormControlLabel className={classes.toggle} control={<Switch checked={props.dayIndexes ? props.dayIndexes.includes(index + 1) : false} onChange={(e) => props.handleSwitches(e)} size="small" color='primary' value={index + 1}/>} />
              </div>
              {index < 6 ? <Divider orientation="vertical" /> : null }
            </Aux>
          )
        )
      }
    </div>
  );
}
