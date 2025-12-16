import React, { useState, useEffect } from 'react';
import { Typography, makeStyles, Grid, Box, Button, DialogContent, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';

import { loadSavedWorkout } from '../../../Store/Action/FreeMemberActions'
import { loadSavedWorkoutToScheduleBYO } from '../../../Store/Action/WorkoutBuilderActions'

import Input from '../AddFavModal/Inputs'
import EditMode from './EditMode'

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
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
}));



export default function LoadFavModal(props) {
  const classes = useStyles();
  const { handleClose, open, showEdit, currentDateIndex , dayOfWeek, isBuildYourOwn} = props;
  const [editMode, setEditMode] = useState(false);
  const savedWrokout  = useSelector(state =>  isBuildYourOwn ? state.buildYourOwn.savedWorkouts : state.freeMember.savedWrokout);
  const  dispatch = useDispatch();

  const [chosenWorkoutIndex, setChosenWorkout] = useState(0);

  const handleLoadWrkout = () => {
    if (isBuildYourOwn) {
      dispatch(loadSavedWorkoutToScheduleBYO(savedWrokout[chosenWorkoutIndex].favoriteId, currentDateIndex))
    }
    else {
      dispatch(loadSavedWorkout(savedWrokout[chosenWorkoutIndex].favoriteId , currentDateIndex, dayOfWeek));
    }
    handleClose();
  }

  const handleEditInput = (e) => {
    setChosenWorkout(e.target.value)
  }


  useEffect(() => {
    if (showEdit) {
      setEditMode(true);
    }
  }, [showEdit]);

  useEffect(() => {
    if (!open) {
      setEditMode(false);
    }
  }, [open]);


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth={true}
      scroll='paper'
    >
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle disableTypography>
        <Typography variant='h4' gutterBottom className={classes.title} id="responsive-dialog-title" align='center'>{editMode ? 'Edit Saved Workouts' : 'Choose a Favorite Workout'}</Typography>
      </DialogTitle>
      <DialogContent style={{maxHeight: 440}}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={10} md={9} lg={8}>
            <Grid container justifyContent='center'>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {
                  editMode
                    ? <EditMode savedWorkouts={savedWrokout} isBuildYourOwn={isBuildYourOwn} handleCloseEdit={()=>setEditMode(!editMode)} />
                    : savedWrokout.length > 0 && <Input label="Select a workout" select selecOptions={savedWrokout} handleEditInput={handleEditInput} />
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={10} md={9} lg={8}>
            {
              editMode
                ? null
                : <Typography variant='subtitle1' align='center' >
                  You have {savedWrokout.length} of 15 workouts saved.
                  {savedWrokout.length >= 15 ? 'To add more delete some of your saved wokrouts.' : null}
                  {savedWrokout.length <= 0 ? ' Save a workout to your favorites to see them here!' : null}
                </Typography>
            }
          </Grid>
        </Grid>
      </DialogContent>
      <Grid container justifyContent='center'>
        <Box mb={2} style={{ width: '100%' }} />
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
          {
            savedWrokout.length <= 0
              ? <Button autoFocus size='large' onClick={handleClose} variant='contained' className={classes.cancel}>
                Cancel
              </Button>
              : <>
                <Button autoFocus size='large' onClick={showEdit ? handleClose : () => setEditMode(!editMode)} variant='contained' className={classes.cancel}>
                  {editMode ? 'Cancel' : 'Edit saved workouts'}
                </Button>
                {
                  !editMode && <Button size='large' onClick={handleLoadWrkout} color="primary" autoFocus className={classes.button}> Choose </Button>
                }
              </>
          }
        </Grid>
        <Box mb={2} style={{ width: '100%' }} />
      </Grid>
    </Dialog>
  );
}
