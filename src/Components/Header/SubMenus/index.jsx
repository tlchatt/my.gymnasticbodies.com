import React from 'react';
import {
  Button,
  Menu,
  makeStyles,
} from '@material-ui/core';

// Icon imports
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import { Vegtables } from '../../GymFitIcons/gbIcons';
import clsx from 'clsx'

// Custom imports
import Aux from '../../../HOC/aux';

const useStyles = makeStyles(theme => ({
  menuButton: {
    padding: '6px'
  },
  forceFreeStyles: {
    background: 'white',
    color: '#656464',
    marginRight: 12
  }
}));

export default function PrimarySearchAppBar( props ) {
  const classes = useStyles();

  const { anchorEl, handleOpen, handleClose } = props;

  return (
    <Aux>
      <Button
            className={clsx(classes.menuButton, {[classes.forceFreeStyles]: props.forceFreeStyles})}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleOpen}
            color="inherit"
            variant={props.variant}
          >
            {props.icon? <Vegtables/> : <PersonIcon /> }
            <ArrowDropDownIcon/>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          style={{top: '25px'}}
      >
        {props.children}
        </Menu>
    </Aux>
  );
}
