import React from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box
} from '@material-ui/core';

import Wrapper from '../../Components/UtilComponents/Wrapper'

import EqiupmentDropdown from './EqiupmentDropdown';
import { equipment } from './data.js'

const useStyles = makeStyles(theme => ({
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
  }
}))

const EqiupmentList = (props) => {
  const classes = useStyles();
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';

  return (
    <Wrapper {...props}>
      <Box m={1} style={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
          <img className={classes.image} src={gfImage} alt="GymFit Logo" />
          <Typography variant='h3' className={classes.title}>
            View Our Recommended Equipment List For Each Course Below <span role='img' aria-labelledby='finger-down'>👇</span>
          </Typography>
        </Grid>
      </Box>
      {
        equipment.map((equipment, index) => <EqiupmentDropdown key={index} title={equipment.title} equipment={equipment} />)
      }
    </Wrapper>
  );
}


export default EqiupmentList;

