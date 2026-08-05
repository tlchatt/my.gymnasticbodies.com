import React from 'react';
import VideoElement from '../../VideoElement';
import { resolvePlaylist } from '../../../lib/video';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
              // resolvePlaylist expands a JW playlist-container id (e.g. a Follow
              // Along class) into its real segment ids — a raw container id 404s
              // against Blob. VideoElement auto-advances and logs errors/stalls.
              ? <VideoElement playlist={resolvePlaylist(videoName)} />
              : null
          }
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default DemoPlayer;
