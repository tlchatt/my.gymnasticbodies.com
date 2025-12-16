import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles(theme => ({
  divider: {
    height: 2,
    margin: 'auto',
    backgroundColor: 'black',
    width: '15%'
  },
  dialogActions: {
    paddingBottom: 20,
    justifyContent: 'center'
  },
  button: {
    letterSpacing: 1
  }
}))

const ResetThrive = props => {
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle align="center" id="alert-dialog-title" style={{paddingBottom: 8}}>Reset all of Thrive?</DialogTitle>
      <Divider className={classes.divider} variant="middle" />
      <DialogContent>
        <DialogContentText id="alert-dialog-description" style={{textAlign: 'center', marginBottom: 0}}>
          Reseting Thrive will revert Thrive Tasks to Task 1. All Lessons will be locked and reverted to Lesson 1. Your Thrive History, Weight, Height, Before Photo and After photo will be deleted. Are you Sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.button} onClick={props.handleClose} variant="contained">
          Cancel
        </Button>
        <Button className={classes.button} onClick={props.handleReset} variant="contained" color="primary" autoFocus>
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResetThrive;
