import React from 'react';
import { Typography } from '@material-ui/core';

const NoProgNotice = () => {
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '40px 0'}}>
      <Typography variant='h6' align='center'>
        Please make sure to add progressions using Edit Workout.
      </Typography>
    </div>
  )
}

export default NoProgNotice;
