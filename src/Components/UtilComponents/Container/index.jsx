import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';


const styles = makeStyles(theme => ({
  root: {
    padding: '0 4px',
    [theme.breakpoints.down('sm')]: {
      padding: "0 8px"
    },
    [theme.breakpoints.up('md')]: {
      padding: "0 40px"
    },
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  }
}));

const Container = (props) => {
  let classes = styles();
  let addClasses;
  // check for adding classes
  if (props.addedClasses) {
    addClasses = [classes.root, props.addedClasses].join(' ');
  }
  else {
    addClasses = classes.root;
  }

  return (
    <div className={addClasses} >
      {props.children}
    </div>
  )
}

export default Container;

Container.propType = {
  addedClasses: PropTypes.string
}
