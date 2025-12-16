import React, { useState } from 'react';
import {
  makeStyles,
  MenuItem,
  Link
} from '@material-ui/core';
import { NavLink } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import { connect, useSelector } from 'react-redux';

import * as actions from '../../../Store/Action/index';


// Custom imports
import FreeHamberger from './FreeHamberger'
import HeaderButton from '../../Header/SubMenus'

const useStyles = makeStyles(theme => ({
  gfAppBar: {
    backgroundColor: "#f5f5f5",
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    color: 'rgb(66, 66, 66)',
    height: '56px',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block',
  },
  sectionDesktop: {
    display: 'flex',
  },
  gfToolBar: {
    minHeight: '56px',
    padding: 0,
    flexGrow: 1
  },
  gfButton: {
    marginRight: 4
  },
  button: {
    margin: theme.spacing(1),
    fontSize: '16px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  menuList: {
    padding: '0 16px',
    fontSize: '14px',
    lineHeight: '48px',
    height: '48px',
    color: 'inherit'
  }
}));


function AvatarDropDown(props) {
  const classes = useStyles();
  const isAdmin = useSelector(state => state.login.isAdmin ? true : false);
  const isFreeMember = useSelector(state => state.login.isFreeMember);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  const [isOpen, setIsOpen] = useState(false)

  // eslint-disable-next-line
  const LinkRef = React.forwardRef((props, ref) => <div style={{ display: 'contents' }} ref={ref}><NavLink {...props} /></div>);

  const Component = props.isMobile ? FreeHamberger : HeaderButton

  return (
    <Component handleOpen={handleOpen} variant='contained' anchorEl={anchorEl} handleClose={handleClose} forceFreeStyles>
      <MenuItem href="https://www.gymnasticbodies.com/my-account/" component={Link} className={classes.menuList}>Manage Subscription</MenuItem>
      {
        isFreeMember ? null : <MenuItem to="/course-library" component={LinkRef} className={classes.menuList} onClick={handleClose}>Course Library</MenuItem>
      }
      <Divider />
      <MenuItem className={classes.menuList} onClick={() => {
        if (isOpen) {
          window.Beacon('destroy');
          setIsOpen(false)
        } else {
          window.Beacon('init', 'eac459f5-02ec-46c7-a03e-929012bfa66a')
          setIsOpen(true)
        }
      }}>{isOpen ? 'Close Support' : 'Open Support'}</MenuItem>
      <MenuItem href="https://www.gymnasticbodies.com/forum/" component={Link} className={classes.menuList}>Forum</MenuItem>
      {
        isAdmin
          ? [
            <Divider key='something1' />,
            <MenuItem key='something2' to="/admin" component={LinkRef} className={classes.menuList} onClick={handleClose}>Admin Dashboard</MenuItem>
          ]
          : null
      }
      <Divider />
      <MenuItem className={classes.menuList} onClick={props.onLogout}>Logout</MenuItem>
    </Component>
  );
}
// hello
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.Logout())
  }
}


export default connect(null, mapDispatchToProps)(AvatarDropDown);
