import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white !important',
    borderRadius: '8px !important'
  }
}));

export default function NativeSelects(props) {
  const classes = useStyles();

  const { state, handleChange } = props;

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">View</InputLabel>
      <Select
        native
        value={state.age}
        onChange={handleChange}
        label="Age"
        className={classes.focused}
        inputProps={{
          name: 'view',
          id: 'outlined-age-native-simple',
        }}
        classes={{
          root: classes.root
        }}
      >
        <option value='Week View'>Weekly</option>
        <option value='Daily View'>Daily</option>
      </Select>
    </FormControl>
  );
}
