import React from 'react';
import { makeStyles, Typography, Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    // input label when focused
    "& label.Mui-focused": {
      color: '#FF9435'
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: '#FF9435'
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: '#FF9435'
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: '#FF9435'
      },
    }
  },
  selectRoot: {
    '&:focus':{
      borderColor: '#FF9435'
    }
  },
  labelText: {

  }
}));

export default function InputWithGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={12 / 4} md={12 / 4} lg={12 / 4} >
          <Typography variant='h6' style={{ color: '#656464', fontWeight: 300 }} align='center'>
            {props.label}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9}>
          {
            props.select
              ? <Select className={classes.root} classes={{ root: classes.selectRoot }} id="fav-modal-input-with-icon-grid" style={{ width: '100%' }} native variant="outlined" onChange={props.handleEditInput}>
                {
                  props.select && props.select && props.selecOptions.map((item, index) => <option key={index} value={index}> {item.title} - {item.description} </option>)
                }
              </Select>
              : <TextField className={classes.root} id="fav-modal-input-with-icon-grid" style={{ width: '100%' }} variant="outlined" value={props.initialTitle} onChange={props.onChange} />
          }

        </Grid>
      </Grid>
    </div>
  );
}
