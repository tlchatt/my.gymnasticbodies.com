import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import ReactJWPlayer from 'react-jw-player';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { CloseModal } from '../../Store/Action/DemoModalActions';
import PlayerPreview from './PlayerPreview';


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
  const dispatch = useDispatch();

  const classes = useSytles(phoneScreen);
  const [mediaUrl, setMediaUrl] = useState();
  const [title, setTitle] = useState('');

  const open = useSelector(state => state.demoModal.open);

  const playerData = useSelector(state => state.demoModal.data);


  useEffect(() => {
    if (playerData.Strength) {
      setMediaUrl(`https://content.jwplatform.com/feeds/${playerData.Strength.videos[0].videoName}`)
      setTitle(playerData.Strength.demoVideoName)
    }
    if (playerData.Mobility && !playerData.Strength) {
      setMediaUrl(`https://content.jwplatform.com/feeds/${playerData.Mobility.videos[0].videoName}`)
    }
  }, [playerData])

  const handleVideo = (videoName, videoUrl) => {
    setMediaUrl(`https://content.jwplatform.com/feeds/${videoUrl}`)
    setTitle(videoName)
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => dispatch(CloseModal())}
        maxWidth='sm'
        classes={{
          paper: classes.paper
        }}
        fullScreen={phoneScreen}
        fullWidth={true}
        scroll='body'
      >
        <MuiDialogTitle disableTypography className={classes.modalHead}>
          <Typography variant="h6">{playerData.Strength ? playerData.Strength.name : 'Pregession' } Demo</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={() => dispatch(CloseModal())}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent classes={{ root: classes.padding }}>
          {
            open && mediaUrl
              ? <ReactJWPlayer
                  playerId='demo-player-modal'
                  playerScript={`https://content.jwplatform.com/libraries/iOa0nJDF.js${playerSignedUrl}`}
                  playlist={mediaUrl}
                  onError={(err) => console.log("onError", err)}
                  onSetupError={(err) => console.log("onSetupError", err)}
                />
              : null
          }
          <div className={classes.body}>
            <Typography variant="h6" align="center">{ title }</Typography>
            <Grid container justifyContent='center' >
              {
                playerData.Strength && playerData.Strength.videos && playerData.Strength.videos.length
                  ? <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
                    <Typography variant='h6' align="center" style={{marginBottom: 8}}>Strength Demo Video</Typography>
                    <PlayerPreview
                      handlePlayer={() => handleVideo(playerData.Strength.demoVideoName , playerData.Strength.videos[0].videoName)}
                      imageName={playerData.Strength.imageName}
                      videoTitle={playerData.Strength.demoVideoName}
                    />
                  </Grid>
                  : null
              }
              {
                playerData.Mobility && playerData.Mobility.videos && playerData.Mobility.videos.length
                  ? <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
                    <Typography variant='h6' align="center" style={{marginBottom: 8}}>Mobility Demo Video</Typography>
                    <PlayerPreview
                      handlePlayer={() => handleVideo(playerData.Mobility.demoVideoName , playerData.Mobility.videos[0].videoName)}
                      imageName={playerData.Mobility.imageName}
                      videoTitle={playerData.Mobility.demoVideoName}
                    />
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

export default DemoPlayer;
