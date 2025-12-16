import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import ReactJWPlayer from 'react-jw-player';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

// import DiscordChat from '../../NonLegacyModal/DiscordChat'

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

const LegacyWorkoutPLayer = props => {
  const theme = useTheme();
  const phoneScreen = useMediaQuery(theme.breakpoints.down(415));
  const playerSignedUrl = useSelector(state => state.login.signedUrl);

  const classes = useSytles(phoneScreen);
  const [mediaUrl, setMediaUrl] = useState();

  const { playerData, open, followAlong, isFollowAlong } = props;

  useEffect(() => {
    if (open && playerData && !isFollowAlong) {
      setMediaUrl( `https://content.jwplatform.com/feeds/${playerData.videoUrl}` )
    }
    if (open && followAlong && isFollowAlong) {
      setMediaUrl(followAlong)
    }
  }, [playerData, open, followAlong, isFollowAlong])

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={props.handleClose}
        maxWidth='sm'
        classes={{
          paper: classes.paper
        }}
        fullScreen={phoneScreen}
        fullWidth={true}
        scroll='body'
      >
        <MuiDialogTitle disableTypography className={classes.modalHead}>
          <Typography variant="h6">{isFollowAlong ? 'Follow Along' : props.playerData.videoTitle}</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent classes={{ root: classes.padding }}>
          {
            props.open && mediaUrl ?
              <ReactJWPlayer
                playerId='legacy-player-modal'
                playerScript={`https://content.jwplatform.com/libraries/iOa0nJDF.js${playerSignedUrl}`}
                playlist={mediaUrl}
                onError={(err) => console.log("onError", err)}
                onSetupError={(err) => console.log("onSetupError", err)}
              />
              : null
          }
          <div className={isFollowAlong || props.playerData.hideSecondTitle ? null : classes.body}>
            {
              props.playerData.hideSecondTitle ? null : <Typography variant="h6" align="center">{props.playerData.videoTitle} { playerData && playerData.videoTitle === "Follow Along" ? null : props.playerData.steps}</Typography>
            }
            {playerData.instructions && playerData.instructions.length ? <Typography variant="body1" align="center">Equipment: {playerData.instructions[0].equipment}</Typography> : null}
            <Grid container justifyContent='center' >
              {
                playerData.focusPoints && playerData.focusPoints.length
                  ? <Grid item xs={12} sm={7} md={7} lg={7} className={classes.grid}>
                    <Typography variant='h6' align="center">
                      Focus Points
                    </Typography>
                    <ul className={classes.orderedList}>
                      {playerData.focusPoints.map((tip, index) => <Typography variant='body1' component='li' key={index} style={{ paddingBottom: 8 }}>{tip.description}</Typography>)}
                    </ul>
                  </Grid>
                  : null
              }

              {
                playerData.technicalTips && playerData.technicalTips.length
                  ? <Grid item xs={12} sm={5} md={5} lg={5} className={classes.grid}>
                      <Typography variant='h6' align="center">Technical Videos</Typography>
                      {playerData.technicalTips.map((techTip, index) => <Typography key={index} variant='body1' className={classes.techVideo} onClick={() => setMediaUrl(`https://content.jwplatform.com/feeds/${techTip.videoName}`)}> <PlayCircleOutlineIcon className={classes.playButton} />Technical Tip {index + 1}</Typography>)}
                    {
                      mediaUrl !== `https://content.jwplatform.com/feeds/${playerData.videoUrl}`
                        ? <Typography
                            variant='body1'
                            className={classes.techVideo}
                            onClick={() => setMediaUrl(`https://content.jwplatform.com/feeds/${playerData.videoUrl}`)}>
                            <PlayCircleOutlineIcon className={classes.playButton} />{props.playerData.videoTitle}
                          </Typography>
                          : ''
                    }
                    </Grid>
                  : null
              }

              {
                playerData.instructions && playerData.instructions.length
                  ? <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
                      <Typography variant='h6' align="center"> Instructions </Typography>
                      {playerData.instructions.map((instructions, index) => <Typography variant='body1' key={index} className={classes.instusction}>{instructions.instructions}</Typography>)}
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

export default React.memo(LegacyWorkoutPLayer);
