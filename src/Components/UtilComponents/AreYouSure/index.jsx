import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  divider: {
    height: 2,
    margin: 'auto',
    marginBottom: 12,
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

const AreYouSure = props => {
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
      <DialogTitle align="center" id="alert-dialog-title">{props.message}</DialogTitle>
      <Divider className={classes.divider} variant="middle" />
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.button} onClick={props.handleClose} variant="contained">
          Cancel
        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            props.cb()
            props.handleClose()
          }}
          variant="contained"
           color="primary" autoFocus>
          {props.cbMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default AreYouSure;
