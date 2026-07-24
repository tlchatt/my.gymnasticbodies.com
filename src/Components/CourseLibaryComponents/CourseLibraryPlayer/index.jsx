import React from 'react';
import { logEvent } from '../../../util/clientLogger';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const BLOB = 'https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com';

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
  const mediaId = videoName ? videoName.split(/[.?]/)[0] : videoName;

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
              ? <video
                  key={mediaId}
                  controls
                  autoPlay
                  style={{ width: '100%', display: 'block' }}
                  src={`${BLOB}/${mediaId}.mp4`}
                  onError={() => logEvent('my.video.error', {
                    level: 'error',
                    component: 'CourseLibraryPlayer',
                    mediaId,
                    src: `${BLOB}/${mediaId}.mp4`,
                    title,
                  })}
                  onStalled={() => logEvent('my.video.stalled', {
                    level: 'warn',
                    component: 'CourseLibraryPlayer',
                    mediaId,
                  })}
                />
              : null
          }
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default DemoPlayer;
