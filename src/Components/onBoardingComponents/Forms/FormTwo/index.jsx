import React from 'react';
import {
  makeStyles,
  Grid,
  CardActions,
  LinearProgress,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';

// Custom components

const styles = makeStyles(theme => ({
  gfTitle: {
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: '32px',
    margin: '24px 0 8px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '4px'
    }
  },
  container:{
    display: props => props.active === true ? 'flex' : 'none',
    flexDirection: 'column',

  },
  margin8: {
    margin: '8px'
  },
  paddingLeft: {
    paddingLeft: 8
  },
  gfSubText: {
    fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '0.04em',
    margin: '0 0 32px',
    opacity: '0.52'
  },
  gfButtonLarge: {
    width: '100%',
    height: '48px',
    fontSize: '1.125rem',
    padding: '0 30px',
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    letterSpacing: '2px',
    fontWeight: 400,
    [theme.breakpoints.between('xs','sm')]: {
      padding: '0 20px',
    }
  },
  root: {
    height: '8px'
  },
  buttonDiv: {
    margin: '16px 0'
  }
}))



const FormZero = (props) => {
  const classes = styles(props);

  return (
    <div className={classes.container}>
      <LinearProgress variant="determinate" value={30} classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
      }}/>
        <Grid item xs={12} sm={12} md={12} lg={12} className={[classes.margin8, classes.paddingLeft].join(' ')}>
          <h2 className={classes.gfTitle}>Age</h2>
          <h3 className={classes.gfSubText}>What is your age? Our programs can be started at any age. In fact, we’ve seen students develop advanced skills who began over 50.</h3>
        </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.margin8}>
          <CardActions className={classes.buttonDiv}>
            <Button variant="contained" className={classes.gfButtonLarge} onClick={props.handleClick} > I am 18 - 24 </Button>
          </CardActions>
          <CardActions className={classes.buttonDiv}>
            <Button variant="contained" className={classes.gfButtonLarge} onClick={props.handleClick} > I am 25 - 34 </Button>
          </CardActions>
          <CardActions className={classes.buttonDiv}>
              <Button variant="contained" className={classes.gfButtonLarge} onClick={props.handleClick}> I am 35 - 44 </Button>
            </CardActions>
            <CardActions className={classes.buttonDiv}>
              <Button variant="contained" className={classes.gfButtonLarge} onClick={props.handleClick} > I am 45 - 54 </Button>
          </CardActions>
          <CardActions className={classes.buttonDiv}>
              <Button variant="contained" className={classes.gfButtonLarge} onClick={props.handleClick} > I am 55+ </Button>
          </CardActions>
        </Grid>
      </div>
  );
}

export default FormZero;

FormZero.propTypes = {
  active: PropTypes.bool.isRequired
}
