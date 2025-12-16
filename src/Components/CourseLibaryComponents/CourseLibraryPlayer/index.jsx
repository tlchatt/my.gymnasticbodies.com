import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography } from '@material-ui/core';
import ReactJWPlayer from 'react-jw-player';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';


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
    paddingLeft: 0,
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
  }
}))

const DemoPlayer = props => {
  const theme = useTheme();
  const phoneScreen = useMediaQuery(theme.breakpoints.down(415));
  const playerSignedUrl = useSelector(state => state.login.signedUrl);
  const classes = useSytles(phoneScreen);

  const { open, videoName, CloseModal , title} = props;


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={CloseModal}
        maxWidth='sm'
        classes={{
          paper: classes.paper
        }}
        fullScreen={phoneScreen}
        fullWidth={true}
        scroll='body'
      >
        <MuiDialogTitle disableTypography className={classes.modalHead}>
          <Typography variant="h6">{title}</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={CloseModal}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent classes={{ root: classes.padding }}>
          {
            open && videoName
              ? <ReactJWPlayer
                  playerId='course-library-player-modal'
                  playerScript={`https://content.jwplatform.com/libraries/iOa0nJDF.js${playerSignedUrl}`}
                  playlist={`https://content.jwplatform.com/feeds/${videoName}`}
                  onError={(err) => console.log("onError", err)}
                  onSetupError={(err) => console.log("onSetupError", err)}
                />
              : null
          }
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default DemoPlayer;
