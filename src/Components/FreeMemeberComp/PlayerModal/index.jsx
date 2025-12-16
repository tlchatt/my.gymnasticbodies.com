import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Grid} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// import './testing.scss'

const useSytles = makeStyles(theme => ({
  padding: {
    padding: 0,
  },
  body: {
    background: 'black',
    color: 'white',
    padding: 8
  },
  rootOverRide: {
    padding: '24px 0',
    width: '100%',
    margin: '16px',
    maxWidth: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    color: 'white',
  },
  modalHead: {
    margin: 0,
    padding: '12px 16px',
    color: 'white',
    background: 'black'
  },
  paper: {
    maxWidth: 800,
    background: 'black',
  },
  grid: {
    padding: 8
  },
  orderedList: {
    margin: '8px 0 0px',
    listStyleType: 'none',
  },
  techVideo: {
    display: 'flex',
    margin: '4px 0',
    justifyContent: phoneScreen => phoneScreen ? 'end' : 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  playButton: {
    marginRight: 4
  },
  noDisplay: {
    display: 'none'
  }
}))

const PlayerModal = props => {
  const theme = useTheme();
  const phoneScreen = useMediaQuery(theme.breakpoints.down(426));
  const classes = useSytles(phoneScreen);
  const { open, isFollowAlong, isIndividualVideo} = props;

  const title = props.levelsPlayer && !isIndividualVideo
    ? `${props.trainingType} - ${props.className} `
    : `${isIndividualVideo ? props.trainingType +' - ' : '' }${props.exerciseName} - ${props.repsOrSecs}`;


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={props.handleClose}
        maxWidth='md'
        classes={{
          paper: classes.paper
        }}
        // fullScreen={phoneScreen}
        fullWidth={true}
        scroll='body'
      >
        <MuiDialogTitle disableTypography className={classes.modalHead}>
          <Typography variant="h6">{isFollowAlong ? 'Follow Along' : title }</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent classes={{ root: classes.padding }}>
          {props.children}
          <div className={isFollowAlong ? classes.noDisplay : classes.body}>
            <Grid container justifyContent='center' >
              {
                props.exerciseFocusPoints && props.exerciseFocusPoints.length
                  ? <Grid item xs={12} sm={7} md={7} lg={7} className={classes.grid}>
                    <Typography variant='h6' align="center">
                      Focus Points
                    </Typography>
                    <ul className={classes.orderedList}>
                      {props.exerciseFocusPoints.map((tip, index) => <Typography variant='body1' component='li' key={index} style={{ paddingBottom: 8 }}>{tip.description}</Typography>)}
                    </ul>
                  </Grid>
                  : null
              }
              {
                props.description
                  ? <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
                    <Typography gutterBottom variant='h6' align="center">
                      Description
                    </Typography>
                    <Typography variant='body1' >
                      {props.description}
                    </Typography>
                  </Grid>
                  : null
              }
            </Grid>
          </div>

        </DialogContent>
      </Dialog>
    </React.Fragment>

  );
}

export default React.memo(PlayerModal);
