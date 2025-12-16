import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import moment from 'moment'


const DaySwitches = props => {
  return (
    <FormGroup style={{alignItems: 'center'}}>
      <FormControlLabel
        control={<Switch color="primary" checked={props.logged} onChange={(e) => props.handleSwitches(e, props.day)} />}
        label={moment(props.day, 'YYYY-MM-DD').format('MMM Do, YYYY')}
        style={{justifyContent: 'center', padding: '4px 0'}}
      />
      {
        props.last ? null : <Divider variant='middle' style={{ width: '35%' }} />
      }
    </FormGroup>
  );
}

export default DaySwitches;
