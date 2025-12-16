import React from 'react';
import {
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import PropTypes from 'prop-types';

// Custom components

const styles = makeStyles(theme => ({
  container:{
    display: props => props.active === true ? 'flex' : 'none',
    flexDirection: 'column',
    minHeight: '710px',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      minHeight: 680,
    },
    backgroundImage: props => props.gender === 'male' ?
      'url("https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2019/07/330x220-on-board-3.jpg")' :
      'url("https://www.gymnasticbodies.com/gymfit/wp-content/uploads/2019/07/330x220-on-board-1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: '37%'
  },
  gfTitle: {
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    fontSize: '1.75rem',
    fontWeight: 400,
    lineHeight: '32px',
    margin: '24px 0 20px',
    color: '#ffffff'
  },
  centerContainer: {
    textAlign: 'center',
    margin: 'auto'
  }
}))



const FormSeven = (props) => {
  const classes = styles(props);

  return (
    <div className={classes.container}>
      <div className={classes.centerContainer}>
        <h2 className={classes.gfTitle}>
          Developing Workout Plans
        </h2>
        <CircularProgress/>
      </div>
    </div>
  );
}

export default FormSeven;

FormSeven.propTypes = {
  active: PropTypes.bool.isRequired,
  gender: PropTypes.oneOf(['male', 'female', '']).isRequired
}
