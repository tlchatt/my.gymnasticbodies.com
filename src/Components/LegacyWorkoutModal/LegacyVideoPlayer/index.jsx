import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import VideoElement from '../../VideoElement';
import { toPlaylistItem } from '../../../lib/video';

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

  const classes = useSytles(phoneScreen);
  // playlist: [{ src, poster }] fed to VideoElement.
  // activeId: raw media id of the current single video (null in follow-along mode)
  //           — used to decide whether to show the "back to main video" link.
  const [playlist, setPlaylist] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const { playerData, open, followAlong, isFollowAlong } = props;

  const playSingle = (id) => {
    setActiveId(id);
    setPlaylist([toPlaylistItem(id)]);
  };

  useEffect(() => {
    if (open && playerData && !isFollowAlong) {
      setActiveId(playerData.videoUrl);
      setPlaylist([toPlaylistItem(playerData.videoUrl)]);
    }
    if (open && followAlong && isFollowAlong) {
      setActiveId(null);
      setPlaylist(followAlong);
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
            props.open && playlist.length ?
              <VideoElement playlist={playlist} />
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
                      {playerData.technicalTips.map((techTip, index) => <Typography key={index} variant='body1' className={classes.techVideo} onClick={() => playSingle(techTip.videoName)}> <PlayCircleOutlineIcon className={classes.playButton} />Technical Tip {index + 1}</Typography>)}
                    {
                      activeId !== playerData.videoUrl
                        ? <Typography
                            variant='body1'
                            className={classes.techVideo}
                            onClick={() => playSingle(playerData.videoUrl)}>
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
