import React from 'react';
import Collapse from '@material-ui/core/Collapse';

import Notes from './Notes';
import Log from './Log'

const DropDown = props => {
  let dropDown;
  if (props.type === 'notes') {
    dropDown = (<Notes handleDropDown={props.hanldleDropDown} handleClose={props.handleClose} data={props.data} workoutInfo={ props.workoutInfo }/>);
  }
  if (props.type === 'log') {
    dropDown = (<Log handleDropDown={props.hanldleDropDown} handleClose={props.handleClose} data={props.data} workoutInfo={ props.workoutInfo } isStretchFollow={props.isStretchFollow}/>);
  }

  return (
    <Collapse in={props.open}>
      {dropDown}
    </Collapse>
  )
}

export default DropDown;
