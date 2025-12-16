import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '4px',
    width: '100%'
  }
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const options = props.options ? props.options : ['Segment 1', 'Segment 2', 'Segment 3', 'Segment 4', 'Segment 5', 'Segment 6', 'Segment 7', 'Segment 8']

  return (
      <FormControl className={classes.formControl}>
        <Select
        native
        value={props.value}
        onChange={event => props.handleWeekIndex(event)}
        inputProps={{
          week: 'week',
          id: 'week-native-simple',
        }}
        disabled={!props.disabled}
        style={props.style}
        >
          {options.map((item, index) => <option key={index} value={index + 1}>{item}</option> )}
        </Select>
      </FormControl>
  );
}
