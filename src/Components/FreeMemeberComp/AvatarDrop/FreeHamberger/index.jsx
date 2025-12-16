import React from 'react';
import {
  Button,
  Menu,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx'

// Icon imports
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
  menuButton: {
    padding: '6px'
  },
  forceFreeStyles: {
    color: 'white',
    marginRight: 12
  }
}));

export default function FreeHamberger(props) {
  const classes = useStyles();

  const { anchorEl, handleOpen, handleClose } = props;

  return (
    <>
      <Button
        className={clsx(classes.menuButton, { [classes.forceFreeStyles]: props.forceFreeStyles })}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        { Boolean(anchorEl) ? <CloseIcon/> : <MenuIcon/>}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ top: '25px' }}
      >
        {props.children}
      </Menu>
    </>
  );
}
