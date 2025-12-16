import React, {useState} from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
  Select
} from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useDispatch } from 'react-redux';

import {selectBeginenrWorkout, generateWorkoutLevels } from '../../../../Store/Action/LevelsActions'
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#6C6C6C',
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
    },
    marginRight: theme.spacing(2),
    [theme.breakpoints.down(426)]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    }
  },
  selectRoot: {
    '&:focus':{
      borderColor: '#FF9435'
    }
  },
  selectDiv: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 12,
    [theme.breakpoints.down(426)]: {
      flexDirection: 'column',
    }
  }
}));

const GenerateWorkoutBeginner = (props) => {
  // classes
  const classes = useStyles();
  // redux
  const dispatch = useDispatch();

  // props
  const {
    dateKey,
    dateKeyIndex,
    hideText,
    text,
    options,
    workoutId,
    isLevels,
    isInModal,
    handleClose
  } = props;

  // state
  const [selectedOption, setSelectedOption] = useState(1);

  // event handlers
  const handleChange = (e) => {
    setSelectedOption( parseInt( e.target.value));
  }

  const handleSelect = () => {
    if (isLevels) {
      dispatch(generateWorkoutLevels(selectedOption, dateKeyIndex, dateKey))
    }
    else {
      dispatch(selectBeginenrWorkout(dateKeyIndex, dateKey, selectedOption));
    }

    if (isInModal) {
      handleClose()
    }
  }

  // use effect
  useEffect(() => {
    setSelectedOption(workoutId)
  }, [workoutId])


  return (
    <Box p={1} mb={2}>
      <Grid container>
        {
          !hideText && <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography gutterBottom align='center' variant='h5' className={classes.title}>
              { text ? text : 'This day doesn’t have a workout yet.'}
            </Typography>
          </Grid>
        }
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.selectDiv}>
          <Select className={classes.root} classes={{ root: classes.selectRoot }} id="fav-modal-input-with-icon-grid" native variant="outlined" onChange={handleChange} value={selectedOption}>
            {
              options ? options : [...Array(40)].map((item, index) => <option key={index} value={index + 1}> {'Workout ' + (index + 1)} </option>)
            }
          </Select>
          <Button size='large' variant='contained' startIcon={<AutorenewIcon />} style={{ backgroundColor: 'white', color: '#656464', fontSize: 18, padding: '4px 22px' }} onClick={handleSelect}>
            Generate Workout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GenerateWorkoutBeginner;
