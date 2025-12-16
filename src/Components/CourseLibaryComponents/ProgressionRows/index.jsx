import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Divider,
} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import ProgCard from './ProgCard';


const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
  techVideo: {
    display: 'flex',
    margin: '4px 0',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  playButton: {
    marginRight: 4
  }
}))

const ProgressionRows = (props) => {
  const classes = useStyles();

  const {
    imName,
    name,
    element,
    imageName,
    imRepsOrSecs,
    repsOrSecs,
    exercisesVideos,
    exercisesFocusPoints,
    openVideoModal,
    hideReps
  } = props;

  return (
    <>
      <Divider style={{ width: '100%' }} />
      <Box m={1} mb={2}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box mb={4} mt={1}>
              <Typography variant='h4'>
                {name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} >
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6} >
                <Box m={1} className={classes.box}>
                  <ProgCard imageName={imageName} title={element} setsReps={repsOrSecs} hideReps={hideReps} isMobility={false} />
                </Box>
              </Grid>
              {
                imName && <Grid item xs={12} sm={12} md={6} lg={6} >
                  <Box m={1} className={classes.box}>
                    <ProgCard imageName={imageName + 'IM'} title={element + '>iM'} setsReps={imRepsOrSecs} hideReps={ hideReps } isMobility={true} />
                  </Box>
                </Grid>
              }
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Box mb={2}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant='h6'>
                    Exercise videos
                  </Typography>
                </Grid>
                {
                  exercisesVideos.strength
                  && exercisesVideos.strength.length > 0
                  && exercisesVideos.strength.map((video, i) => <Grid item xs={6} sm={6} md={6} lg={6} key={i}>
                    <Typography onClick={() => openVideoModal(video.videoName, element + " Strength Video" )} variant='body1' className={classes.techVideo}> <PlayCircleOutlineIcon className={classes.playButton} />Strength Video</Typography>
                  </Grid>
                  )
                }
                {
                  exercisesVideos.mobility
                  && exercisesVideos.mobility.length > 0
                  && exercisesVideos.mobility.map((video, i) => <Grid item xs={6} sm={6} md={6} lg={6} key={i}>
                    <Typography onClick={() => openVideoModal(video.videoName, element + "iM Mobility Video" )}  variant='body1' className={classes.techVideo}> <PlayCircleOutlineIcon className={classes.playButton} />Mobility Video</Typography>
                  </Grid>
                  )
                }
                {
                  exercisesVideos.tips
                  && exercisesVideos.tips.length > 0
                  && exercisesVideos.tips.map((video, i) => <Grid item xs={6} sm={6} md={6} lg={6} key={i}>
                    <Typography onClick={() => openVideoModal(video.videoName, (video.order === 1 ? "Strength" : "Mobility") + " Tech Video")} variant='body1' className={classes.techVideo}> <PlayCircleOutlineIcon className={classes.playButton} />{video.order === 1 ? "Strength" : "Mobility" } Tech Video</Typography>
                  </Grid>
                  )
                }
              </Grid>
            </Box>
            {
              exercisesFocusPoints.strength && exercisesFocusPoints.strength.length > 0 &&
              <Box mb={2}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography gutterBottom variant='h4'>
                      Focus Points
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {exercisesFocusPoints.strength.map((focusPoint, index) => <Typography gutterBottom variant='body1' key={index}>{focusPoint.description}</Typography>)}

                  </Grid>
                </Grid>
              </Box>
            }
            {
              exercisesFocusPoints.mobility && exercisesFocusPoints.mobility.length > 0 &&
              <Box mb={2}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography gutterBottom variant='h4'>
                      Mobility Focus Points
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {exercisesFocusPoints.mobility.map((focusPoint, index) => <Typography gutterBottom variant='body1' key={index}>{focusPoint.description}</Typography>)}
                  </Grid>
                </Grid>
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
}


export default ProgressionRows;

