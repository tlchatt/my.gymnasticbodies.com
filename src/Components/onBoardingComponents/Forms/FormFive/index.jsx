import React from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  LinearProgress,
  CardActionArea
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
  },
  padding: {
    padding: '8px'
  }
}))



const FormFive = (props) => {
  const classes = styles(props);

  return (
    <div className={classes.container}>
      <LinearProgress variant="determinate" value={67.5} classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
      }}/>
        <Grid item xs={12} sm={12} md={12} lg={12} className={[classes.margin8, classes.paddingLeft].join(' ')}>
          <h2 className={classes.gfTitle}>Mobility 1 of 2</h2>
          <h3 className={classes.gfSubText}>Back Line mobility means that your calfs, hamstrings and lower back are all flexible.</h3>
        </Grid>
        <Grid container className={classes.padding} justifyContent='center'>
          <Grid item xs={6} sm={6} md={6} lg={6} className={classes.padding}>
            <Paper elevation={4}>
              <CardActionArea  onClick={( e ) => props.handleClick(e, 1)}>
                <img alt="" src="https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2019/07/NoToeTouch.jpg" width="100%"/>
              </CardActionArea>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} className={classes.padding}>
            <Paper elevation={4}>
              <CardActionArea onClick={(e) => props.handleClick(e, 2)}>
                <img src="https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2019/07/ToeTouch.jpg" alt="" width="100%"/>
              </CardActionArea>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} className={classes.padding}>
            <Paper elevation={4}>
              <CardActionArea onClick={(e) => props.handleClick(e, 3)}>
                <img alt="" src="https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2019/07/TouchFloor.jpg" width="100%"/>
              </CardActionArea>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} className={classes.padding}>
            <Paper elevation={4}>
              <CardActionArea  onClick={(e) => props.handleClick(e, 4)}>
                <img alt="" src="https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2019/07/Pike.jpg" width="100%"/>
              </CardActionArea>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} className={classes.padding}>
            <Paper elevation={4}>
              <CardActionArea  onClick={(e) => props.handleClick(e, 5)}>
                <img alt="" src="https://gymfit-images.s3.amazonaws.com/Get+Started/new-pike.jpg" width="100%"/>
              </CardActionArea>
            </Paper>
          </Grid>
        </Grid>
      </div>
  );
}

export default FormFive;

FormFive.propTypes = {
  active: PropTypes.bool.isRequired
}
