import React from 'react';
import { makeStyles, Grid, Typography, Link } from '@material-ui/core';

import Cards from './Cards';

const useStyles = makeStyles(theme => ({
  paddingS: {
    padding: '8px',
  },
  centerPage: {
    margin: 'auto'
  },
  title: {
    margin: 0,
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
  }
}));

const Articles = () => {
  const classes = useStyles();
  return (
    <Grid container className={` ${classes.centerPage} ${classes.paddingS}`} item xs={12} sm={12} md={12} lg={12} xl={10}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant='h3' className={classes.title }>
          Relevant Articles
        </Typography>
        <Link href="https://www.gymnasticbodies.com/blog/" target="_blank" rel="noopener" variant="body1" color="textSecondary">
          Read More
        </Link>
      </Grid>
      <Grid item className={classes.paddingS} xs={6} sm={6} md={3} lg={3}>
        <Cards
          link='https://www.gymnasticbodies.com/hips-101-loosen-1-critical-area-before-stretching-hip-flexors/'
          img='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/icon-GymnasticBodies-quad-Stretch.jpg'
          snippet='Hips 101: Loosen This 1 Critical Area BEFORE Stretching Hip Flexors'
        />
      </Grid>
      <Grid item className={classes.paddingS} xs={6} sm={6} md={3} lg={3}>
        <Cards
          link='https://www.gymnasticbodies.com/quick-easy-fix-tight-adductors/'
          img='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/icon-GymnasticBodies-Adductors.jpg '
          snippet='A Quick and Easy Fix For Tight Adductors'
        />
      </Grid>
      <Grid item className={classes.paddingS} xs={6} sm={6} md={3} lg={3}>
        <Cards
          link='https://www.gymnasticbodies.com/forget-every-fitness-challenge-youve-tried-complete-4-movements/'
          img='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/icon-gymnasticbodies-crab-walk.jpg'
          snippet='Forget Every Fitness Challenge You’ve Tried: Complete These 4 Movements'
        />
      </Grid>
      <Grid item className={classes.paddingS} xs={6} sm={6} md={3} lg={3}>
        <Cards
          link='https://www.gymnasticbodies.com/hang-on-for-your-health-simple-drills/'
          img='https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/icon-GymnasticBodies-couple-bar-hang.jpg'
          snippet='Hang on For Your Health With These Simple Drills'
        />
      </Grid>
    </Grid>
  );
}

export default Articles;
