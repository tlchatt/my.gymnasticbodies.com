import React from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  Box
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
  image: {
    width: '128px',
    verticalAlign: 'middle'
  },
  secondaryText: {
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.04em'
  }
}));

const WelcomeHeader = props => {
  const classes = useStyles();
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg'
  return (
    <Box m={1} style={{width: '100%'}}>
      <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin:'auto', textAlign:'center'}} >
        <img className={classes.image} src={gfImage} alt="GymFit Logo"/>
        <Typography variant='h3' className={classes.title}>
          Welcome to your member page, {props.name}!
        </Typography>
        <Typography  variant="body1" align="center" color="textSecondary" className={classes.secondaryText}>
          Check out Blueprints to jump into the courses available to you. <br/> Or Read the Nuts & Bolts to answer common questions.
        </Typography>
      </Grid>
    </Box>
  )
}

export default WelcomeHeader;
