import React from 'react';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';

import GridContainer from '../Mui-GridContainer'
import Container from '../Container'


const useStyles = makeStyles(theme => ({
  background: { background: '#eeeeee', marginBottom: 12 },
}))

const Wrapper = (props) => {
  const classes = useStyles();

  if (props.basicLayout) {
    return (
      <Grid container justifyContent='center'>
        {props.children}
      </Grid>
    )
  }
  else {
    return (
      <Container addedClasses={classes.background}>
        <GridContainer elevation={2} addbackground={true} center={true}>
          {props.children}
        </GridContainer>
      </Container>
    )
  }
}


export default Wrapper;

