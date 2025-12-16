import React, {useState, useEffect} from 'react';
import { Typography, makeStyles, Grid, Box, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch } from 'react-redux';

import { saveWorkout } from '../../../Store/Action/FreeMemberActions'
import {saveWorkoutTofavoriteBYO} from '../../../Store/Action/WorkoutBuilderActions'
import Input from './Inputs'

const useStyles = makeStyles(theme => ({
  title: {
    color: "#FF9435",
    padding: "24px 0 0",
  },
  button: {
    background: "linear-gradient(18deg, #FF9435 0%, #f05621 100%)",
    color: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  cancel: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down(426)]: {
      flexDirection: 'column'
    }
  },
  dashed: {
    padding: '4px 30px',
    fontSize: '18px',
    border: 'dashed 1px black',
    width: '100%',
    color: 'rgb(101, 100, 100)'
  },
}));

export default function FavModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    handleClose,
    open,
    handleOpenLoadFavModal,
    overRideSave,
    currentDate,
    workoutData,
    dateKeyIndex,
    isBuildYourOwn
  } = props;
  const [handleInputs, setHandleInputs] = useState({
    title: '',
    description: '',
  });

  const handleChange = (name, value) => {
    setHandleInputs({ ...handleInputs, [name]: value });
  };

  useEffect(() => {
    if (open) {
      setHandleInputs({
        title: currentDate,
        description: workoutData ? workoutData.map(course => isBuildYourOwn ? course.className || course.exerciseName : course.exerciseName).join(', ') : '',
      })
    }
  }, [open, currentDate, workoutData, isBuildYourOwn]);

  const handleSave = () => {
    if (isBuildYourOwn) {
      dispatch(saveWorkoutTofavoriteBYO(dateKeyIndex, handleInputs.title, handleInputs.description))
    }
    else {
      dispatch(saveWorkout(dateKeyIndex, handleInputs.title, handleInputs.description));
    }
    handleClose();
  }


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth={true}
    >
      <Box m={1}>
        <Box mb={4} >
          <Typography variant='h4' gutterBottom className={classes.title} id="responsive-dialog-title" align='center'>Save this workout?</Typography>
        </Box>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={11} md={10} lg={9}>
            <Grid container justifyContent='center'>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Input label="Save Title" initialTitle={handleInputs.title} onChange={(e) => handleChange('title', e.target.value) } />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Input label="Description" initialTitle={handleInputs.description} onChange={(e) => handleChange('description', e.target.value) } />
              </Grid>
            </Grid>
          </Grid>
          <Box mb={2} style={{ width: '100%' }} />
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
            <Button autoFocus size='large' onClick={handleClose} variant='contained' className={classes.cancel}>
              cancel
            </Button>
            <Button size='large' onClick={overRideSave ? handleOpenLoadFavModal : handleSave} color="primary" autoFocus className={classes.button}>
              save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
