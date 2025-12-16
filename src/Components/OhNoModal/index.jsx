import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { closeOhNo } from '../../Store/Reducers/OhNoReducer';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 40,
    fontWeight: 400,
    lineHeight: 1.35,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: 32,
    fontWeight: 400,
    lineHeight: 1.35,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    marginBottom: 18,
  },
  span: {
    display: 'block',
    background: '#1E88E5',
    height: 2,
    margin: '10px 0',
  },
  width: {
    maxWidth: 150,
    width: '50%',
    margin: '0 auto',
  },
  paperOverride: {
    backgroundColor: '#d5d5d5',
    padding: 40,
    maxWidth: 628,
    [theme.breakpoints.down(426)]: {
      padding: 24,
    }
  },
  noPadding: {
    padding: '0 !important'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OhNoModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ohNoOpenRedux = useSelector(state => state.OhNo.open);


  return (
    <Dialog
      open={props.open || ohNoOpenRedux}
      TransitionComponent={Transition}
      onClose={() => ohNoOpenRedux ? dispatch(closeOhNo()) : props.handleClose()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      fullWidth={true}
      classes={{
        paperScrollPaper: classes.paperOverride
      }}
    >
      <DialogContent className={classes.noPadding}>
        <Typography className={`${classes.title} ${classes.width}`} variant="h2" align='center'>
          Oh No! <span className={classes.span} />
        </Typography>
        <Typography className={`${classes.subTitle}`} variant="h3" align='center'>
          YOU AREN'T ENROLLED IN {props.allAccess ? 'a GymFit TV subscription.' : 'THIS COURSE.'}
        </Typography>
        <Typography variant='body1'>
          In order to access this amazing content, you must first purchase {props.allAccess ? null : 'this course or'} a GymFit TV subscription.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.noPadding}>
        <Button onClick={() => ohNoOpenRedux ? dispatch(closeOhNo()) : props.handleClose()}>
          cancel
        </Button>
        <Button component='a' href={props.allAccess ? 'https://www.gymnasticbodies.com/subscribe/' : 'https://www.gymnasticbodies.com/class-finder/'} onClick={props.handleClose} variant='contained' color="primary">
          Get Access Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}
