import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Paper
} from '@material-ui/core';
import { useSelector } from 'react-redux'
import ReactJWPlayer from 'react-jw-player';

import Wrapper from '../../Components/UtilComponents/Wrapper'

const useStyles = makeStyles(theme=>({
  background: { background: '#eeeeee', marginBottom: 12 },
  image: {
    width: '128px',
    verticalAlign: 'middle'
  },
  title: {
    marginTop: 0,
    marginBottom: '24px',
    fontSize: '40px',
    fontWeight: 400,
    [theme.breakpoints.down(415)]: {
      fontSize: '28px',
    },
    [theme.breakpoints.up(766)]: {
      fontSize: '32px',
    },
    [theme.breakpoints.up(1024)]: {
      fontSize: '40px',
    }
  },
  cardRoot: {
    maxWidth: 330,
    width: '100%',
    margin: 'auto',
    cursor: 'pointer'
  },
  cardMedia: {
    paddingBottom: '80%',
    aspectRatio: 20/16
  }
}))

const howTos = {
  'white-board': {
    mediaId: 'McZSmgTw' ,
    title: 'White Board',
  },
  'guided-plans': {
    mediaId: 'kDN7cnxE' ,
    title: 'Guided Plans',
  },
  'build-your-own': {
    mediaId: '3o98KK3H' ,
    title: 'Build Your Own',
  }
}

const Advocates = (props) => {
  const classes = useStyles();
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';
  const signedUrl = useSelector(state => state.login.signedUrl);
  const params = props.match.params;
  const allowedParams = ['white-board', 'guided-plans', 'build-your-own'];

  if (!allowedParams.includes(params.route)) {
    return <Wrapper basicLayout>
      <Box m={1} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
          <img className={classes.image} src={gfImage} alt="GymFit Logo" />
          <Typography variant='h3' className={classes.title}>
            Looks Like you got the Wrong URL!
          </Typography>
        </Grid>
      </Box>
    </Wrapper>
  }

  return (
    <Wrapper basicLayout>
      <Box m={1} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
          <img className={classes.image} src={gfImage} alt="GymFit Logo" />
          <Typography variant='h3' className={classes.title}>
            Learn How to use {howTos[params.route].title}
          </Typography>
        </Grid>
      </Box>
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <Grid container justifyContent='center'>
          <Grid item xs={11} sm={10} md={10} lg={10}>
            <Paper elevation={4}>
              <ReactJWPlayer
                playerId='my-jwplayer'
                playerScript={`https://content.jwplatform.com/libraries/iOa0nJDF.js${signedUrl}`}
                playlist={`https://content.jwplatform.com/feeds/${howTos[params.route].mediaId}.json`}
                onError={(err) => console.log("onError", err)}
                onSetupError={(err) => console.log("onSetupError", err)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
}


export default Advocates;



