import React from 'react';
import Popover from '@material-ui/core/Popover';

import Log from '../../../LegacyWorkoutModal/ExceriseCard/DropDown/Log'
import Notes from '../../../LegacyWorkoutModal/ExceriseCard/DropDown/Notes'

export default function SimplePopover(props) {

  const open = Boolean(props.anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let dropDown;
  if (props.type === 'notes') {
    dropDown = (
      <Notes
        isLevels
        handleDropDown={props.hanldleDropDown}
        handleClose={props.handleClose}
        data={props.data}
        workoutInfo={props.workoutInfo}
        dateKeyIndex={props.dateKeyIndex}
        isBuildYourOwn={props.isBuildYourOwn}
      />
    );
  }
  if (props.type === 'log') {
    dropDown = (
      <Log
        handleClose={props.handleClose}
        data={props.data}
        workoutInfo={props.data.workoutInfo}
        dateKey={props.dateKey}
        dateKeyIndex={props.dateKeyIndex}
        workoutIndex={props.workoutIndex}
        isBuildYourOwn={props.isBuildYourOwn}
        isLevels
      />
    );
  }

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div style={{maxWidth: 600, padding: props.type === 'notes'? 8 : 0 }}>
        {dropDown}
      </div>
    </Popover>
  );
}
