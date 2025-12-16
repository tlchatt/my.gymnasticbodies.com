import React from 'react';
import ReactJWPlayer from 'react-jw-player';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Grid, Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'


const useSytles = makeStyles(theme => ({
  padding: {
    padding: 8,
    paddingBottom: 48,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',

  },
  title: {
    margin: '16px 0',
    padding: 8,
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: '1.35',
    letterSpacing: '0.07em',
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    [theme.breakpoints.down('414')]: {
      fontSize: 32
    }
  },
  bodyText: {
    padding: 4,
    letterSpacing: '0.04em',
  },
  rootOverRide: {
    padding: '24px 0',
    width: '100%',
    margin: '16px',
    maxWidth: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  modalHead: {
    margin: 0,
    padding: theme.spacing(3),
  },
  icons: {
    opacity: 0.54,
    fontSize: 14,
    letterSpacing: 0,
    textTransform: 'uppercase',
    display: 'flex',
    lineHeight: '26px'
  },
  iconGrid: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}))

function CentralControl(props) {
  const classes = useSytles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const signedUrl = useSelector(state => state.login.signedUrl)

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      maxWidth='lg'
      fullWidth={true}
      fullScreen={fullScreen}
      scroll='body'
    >
      <MuiDialogTitle disableTypography className={classes.modalHead}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.close}>
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent classes={{ root: classes.padding }}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={10} md={10} lg={10}>
            <Typography className={classes.title}>Central Control</Typography>
            <Paper elevation={2}>
              {
                props.open ?
                  <ReactJWPlayer
                    playerId='my-jwplayer'
                    playerScript={`https://content.jwplatform.com/libraries/iOa0nJDF.js${signedUrl}`}
                    playlist={`https://content.jwplatform.com/feeds/w3ModWzX.json`}
                    onError={(err) => console.log("onError", err)}
                    onSetupError={(err) => console.log("onSetupError", err)}
                  />
                : null
              }
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10} md={10} lg={10} style={{padding: 8}}>
            <Typography className={classes.bodyText} variant="body1" gutterBottom>Every time you log on, you will see your welcome page. Go straight to your workout, check out your courses, or see what tools are in your toolbox. The dashboard is your guide to using our workout interface. Add, delete, and reposition your classes for the week.</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default CentralControl;
