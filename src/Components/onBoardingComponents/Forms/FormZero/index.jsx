import React from 'react';
import {
  makeStyles,
  Grid,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';



const styles = makeStyles(theme => ({
  gfTitle: {
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    fontSize: '34px',
    fontWeight: 400,
    lineHeight: '40px',
    margin: '24px 0',
    [theme.breakpoints.down('sm')]: {
      marginTop: '4px'
    }
  },
  container:{
    display: props => props.active === true ? 'flex' : 'none',
    flexDirection: 'column',
    textAlign: 'center'
  },
  margin8: {
    margin: '8px'
  },
  gfSubText: {
    fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '28px',
    letterSpacing: '0.04em'
  },
  gfButtonLarge: {
    width: '75%',
    height: '48px',
    fontSize: '1.125rem',
  }
}))



const FormZero = (props) => {
  const classes = styles(props);

  return (
      <div className={classes.container}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.margin8}>
          <h2 className={classes.gfTitle}>Welcome</h2>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.margin8}>
          <img src="https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2019/05/subscription-banner.jpg" alt="" width="100%"/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.margin8}>
          <h3 className={classes.gfSubText}>
            GymFit offers many programs, all the way from beginner to advanced. This short assessment will help to find the right program for you.
          </h3>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.margin8}>
          <Button className={classes.gfButtonLarge} variant='contained' color='primary' onClick={props.handleClick}>
            Let's Begin
          </Button>
        </Grid>
      </div>
  );
}

export default FormZero;

FormZero.propTypes = {
  active: PropTypes.bool.isRequired
}
