import React from 'react';
import { Grid, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    padding: 8
  },
  ad: {
    width: '100%'
  }
}))

const AllAccessAd = props => {
  const classes = useStyles();
  return (
    < Grid item xs={12} sm={10} md={10} lg={9} xl={8} className={classes.root}>
      <Link href='https://www.gymnasticbodies.com/subscribe' target='_blank' rel="noopener">
        <img src="https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/25-off-ad-vert.jpg" alt="All Access Add" className={classes.ad}/>
      </Link>
    </Grid >
  )
}

export default AllAccessAd;
