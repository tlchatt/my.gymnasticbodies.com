import React from 'react';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  verticalText: {
    fontSize: '1rem',
    textTransform: "uppercase",
    textAlign: 'center',
    transform: 'rotate(270deg)',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    minWidth: 250 - 48,
    fontWeight: 500,
    color: 'white',
  },
  container: {
    position: "relative",
    width: 32,
    background: '#A0A0A0',
    margin: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0'
  },
  icons: {
    fontSize: 32,
    color: 'white',
  },
  containerMobile: {
    background: '#A0A0A0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 18px',
    marginTop: 4,
    marginBottom: 4,
    marginRight: 0,
  },
  text: {
    fontSize: '1rem',
    textTransform: "uppercase",
    textAlign: 'center',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    fontWeight: 500,
    color: 'white',
  }
}));

const VerticalText = (props) => {
  const classes = useStyles();
  // state

  const Icon = props.isMobileMode ? ArrowDropDownIcon : ArrowRightIcon;

  return (
    <div className={clsx({
      [classes.container]: !props.isMobileMode,
      [classes.containerMobile]: props.isMobileMode
    })}
    >
      <Icon className={classes.icons} />
      <Typography
        className={clsx({
          [classes.verticalText]: !props.isMobileMode,
          [classes.text]: props.isMobileMode
        })}
        variant='h6'
      >
        {props.text}
      </Typography>
      <Icon className={classes.icons} />
    </div>
  )
}

export default VerticalText;
