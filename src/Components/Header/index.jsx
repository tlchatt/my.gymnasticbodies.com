import React, {useState} from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  MenuItem,
  Link
} from '@material-ui/core';
import { NavLink } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { connect, useSelector, useDispatch} from 'react-redux';
import * as Sentry from "@sentry/react";

import * as actions from '../../Store/Action/index';

// Icon imports
import { LogoLink } from '../GymFitIcons/gbIcons.js'

// Custom imports
import Container from '../UtilComponents/Container'
import SubMenu from './SubMenus';
import ResetThrive from '../Thrive/ResetThrive'
import { showToast } from '../../Store/Action/calendarActions';

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


const API = process.env.REACT_APP_API;

function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const isThriveUser = useSelector(state => state.login.isThriveUser)
  const isAdmin = useSelector(state => state.login.isAdmin ? true : false);
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.UserId);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [anchorElThrive, setAnchorElThrive] = useState(null);
  const handleOpenThrive = (event) => setAnchorElThrive(event.currentTarget);
  const handleCloseThrive = () => setAnchorElThrive(null);
  const [isOpen, setIsOpen] = useState(false)

  // eslint-disable-next-line
  const LinkRef = React.forwardRef((props, ref) => <div style={{ display: 'contents' }} ref={ref}><NavLink {...props} /></div>);


  const [resetThrive, setResetThrive] = useState(false);
  const dispatch = useDispatch();

  const handleReset = () => {
    var config = {
      method: 'delete',
      url: `${API}/thrive/reset/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };
    axios(config)
      .then(res => {
        setResetThrive(false);
        secondCall();
      }).catch(err => {
        setResetThrive(false);
        dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'))
        Sentry.captureException(err);
      });
  }

  const secondCall = () => {
    var config = {
      method: 'post',
      url: `${API}/thrive/reset/permissions/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
      },
    };
    axios(config)
      .then(res => dispatch(showToast('Successful reset Thrive.', 'success')))
      .catch(err => {
        dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'))
        Sentry.captureException(err);
      });
  }

  return (
    <AppBar className={classes.gfAppBar} position="fixed">
      <Container>
        <Toolbar className={classes.gfToolBar} >
          <LogoLink />
          <div className={classes.grow}></div>
          <Button to="/" component={LinkRef} className={classes.button}>Home</Button>
          <Button to="/class-finder" component={LinkRef} className={classes.button}>Class Finder</Button>
          <Button to="/history" component={LinkRef} className={classes.button}>History</Button>
          <Button href="https://www.gymnasticbodies.com/shop" className={classes.button}>Shop</Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
              isThriveUser
                ? <SubMenu icon={true} handleOpen={handleOpenThrive} anchorEl={anchorElThrive} handleClose={handleCloseThrive} >
                    <MenuItem to="/thrive-profile" component={LinkRef} className={classes.menuList} onClick={handleCloseThrive}>My Profile</MenuItem>
                    <Divider />
                    <MenuItem to="/thrive-lessons" component={LinkRef} className={classes.menuList} onClick={handleCloseThrive}>Thrive Lessons</MenuItem>
                    <MenuItem to="/thrive-tasks" component={LinkRef} className={classes.menuList} onClick={handleCloseThrive}>Thrive Tasks</MenuItem>
                    <Divider />
                  <MenuItem className={classes.menuList} onClick={() => {
                    handleCloseThrive()
                    setResetThrive(true)
                  }}>Reset Thrive</MenuItem>
                  </SubMenu>
                : null
            }
            <SubMenu handleOpen={handleOpen} anchorEl={anchorEl} handleClose={handleClose}>
              <MenuItem href="https://www.gymnasticbodies.com/my-account/" component={Link} className={classes.menuList}>Manage Subscription</MenuItem>
              <MenuItem to="/course-library" component={LinkRef} className={classes.menuList} onClick={handleClose}>Course Library</MenuItem>
              <Divider />
              <MenuItem className={classes.menuList} onClick={() => {
                if (isOpen) {
                  window.Beacon('destroy');
                  setIsOpen(false)
                } else {
                  window.Beacon('init', 'eac459f5-02ec-46c7-a03e-929012bfa66a')
                  setIsOpen(true)
                }
              }}>{ isOpen ? 'Close Support' : 'Open Support' }</MenuItem>
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
            </SubMenu>
          </div>
        </Toolbar>
        <ResetThrive handleReset={handleReset} open={resetThrive} handleClose={() => setResetThrive(false)} />
      </Container>
    </AppBar>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.Logout())
  }
}


export default connect(null, mapDispatchToProps)(PrimarySearchAppBar);
