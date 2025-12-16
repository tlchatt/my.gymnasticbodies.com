import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonsContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Helvetica Neue, "Open Sans", Arial, sans-serif',
    color: '#FF9435',
    textTransform: 'uppercase',
    fontWeight: 400,
  },
}));

export default function GenerateWorkoutModal(props) {
  const classes = useStyles();
  const { open, handleClose } = props;

  const handleCloseModal = () => {
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      fullWidth={true}
      maxWidth='sm'
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" disableTypography>
        <Typography align='center' variant='h6' className={classes.title}>
          Change Workout
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.buttonsContent}>
        { props.children }
      </DialogContent>
      <DialogActions/>
    </Dialog>
  );
}
