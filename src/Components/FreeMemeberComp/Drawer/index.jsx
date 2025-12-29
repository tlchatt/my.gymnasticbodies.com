import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import TestingDrawer from './TestingDrawer';

import { GbWhite, GBWhiteHero } from '../../GymFitIcons/gbIcons';

import { openOhNo } from '../../../Store/Reducers/OhNoReducer';
import { closeDrawer } from '../../../Store/Reducers/OpenDrawerReducer'


const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: 'linear-gradient(173deg, rgba(255,89,2,1) 39%, rgba(255,203,121,1) 100%)'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.easeInOut,
    }),
    background: 'linear-gradient(173deg, rgba(255,89,2,1) 39%, rgba(255,203,121,1) 100%)',
    display: 'block',
  },
  drawerClose: {
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
    background: 'linear-gradient(173deg, rgba(255,89,2,1) 39%, rgba(255,203,121,1) 100%)',
    paddingTop: 0
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.easeInOut,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: '#D1D1D1'
  },
  title: {
    color: 'white'
  },
  allAcces: {
    padding: '24px 0',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  secondSection: {
    flexDirection: 'column',
    [theme.breakpoints.up(425)]: {
      marginBottom: 12,
    },
  },
  paddingOpen: {
    paddingTop: 24,
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.easeInOut,
    }),
  },
  pointer: { cursor: 'pointer' },
  iconImg: {
    maxWidth: 36,
  },
  extraWidth: {
    maxWidth: 50
  },
  extraWidthClosed: {
    maxWidth: 40,
  },
  isActive: {
    '&::before': {
      content: "''",
      width: 56,
      height: 56,
      MozBorderRadius: '50%',
      WebkitBorderRadius: '50%',
      borderRadius: '50%',
      backgroundColor: "#FF9435",
      position: 'absolute',
      zIndex: -1,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    '&::after': {
      content: "''",
      width: 68,
      height: 68,
      MozBorderRadius: '50%',
      WebkitBorderRadius: '50%',
      borderRadius: '50%',
      backgroundColor: "#FFAE65",
      position: 'absolute',
      zIndex: -2,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  isActiveClosed: {
    '&::before': {
      content: "''",
      width: 48,
      height: 48,
      MozBorderRadius: '50%',
      WebkitBorderRadius: '50%',
      borderRadius: '50%',
      backgroundColor: "#FF9435",
      position: 'absolute',
      zIndex: -1,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    '&::after': {
      content: "''",
      width: 56,
      height: 56,
      MozBorderRadius: '50%',
      WebkitBorderRadius: '50%',
      borderRadius: '50%',
      backgroundColor: "#FFAE65",
      position: 'absolute',
      zIndex: -2,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }
}));

function between(x, min, max) {
  return x >= min && x <= max;
}

export default function MiniDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.isMobile ? false : true);
  const userNameFullName = useSelector(state => state.login.name)
  const levelId = useSelector(state => state.login.levelId)
  const postAWS = useSelector(state => state.login.postAWS)

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { isFreeMember } = props

  const [openDrawer, setOpenDrawer] = useState({ open: false, componentId: '' });

  const isSinnglePoint = useSelector(state => !state.login.isAllAccessUser);
  const isThriveUser = useSelector(state => state.login.isThriveUser);

  const OpenDrawerRedux = useSelector(state => state.OpenDrawer);
    console.log('OpenDrawerRedux', OpenDrawerRedux)
    console.log('openDrawer', openDrawer)
  useEffect(() => {
    if (OpenDrawerRedux.open) {
      setOpenDrawer({
        open: true,
        componentId: OpenDrawerRedux.componentId
      })
    }
  }, [OpenDrawerRedux.componentId, OpenDrawerRedux.open])


  const handleCloseDrawer = () => {
    setOpenDrawer({ open: false, componentId: '' });
    if (OpenDrawerRedux.open) {
      dispatch(closeDrawer());
    }
  };

  const handleOpenDrawer = (id) => {
    if (location.pathname !== '/') {
      if (levelId === 9 && id === 'SwitchToAuto') {
        history.push('/');
        handleCloseDrawer();
      }
      else if (between(levelId, 0, 4) && id === 'GuidedPlans') {
        history.push('/');
        handleCloseDrawer();
      }
      else if (levelId === 10 && id === 'BuildYourOwn') {
        history.push('/');
        handleCloseDrawer();
      }
      else {
        if (openDrawer.componentId === id && openDrawer.open) {
          handleCloseDrawer();
        }
        else {
          setOpenDrawer({ open: true, componentId: id });
        }
      }
    }
    else {
      if (openDrawer.componentId === id && openDrawer.open) {
        handleCloseDrawer();
      }
      else {
        console.log(' else setOpenDrawer')
        setOpenDrawer({ open: true, componentId: id });
      }
    }
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleCallBackFunction = (id, showAllAccess = true) => {
    if (isFreeMember || !showAllAccess) {
      dispatch(openOhNo());
    }
    else {
      handleOpenDrawer(id)
    }
  }

  let firstSection
  if (postAWS) {
    firstSection = [
      {
        text: 'Guided Plans',
        cb: () => handleCallBackFunction('GuidedPlans'),
        imageName: 'GuidedPlans.png',
        ids: [0, 1, 2, 3, 4],
        isActive: () => {
          if (location.pathname === '/') {
            if (openDrawer.open && openDrawer.componentId !== 'GuidedPlans') {
              return false
            }
            if ([0, 1, 2, 3, 4].indexOf(levelId) > -1) {
              return true
            }
            if (openDrawer.open && openDrawer.componentId === 'GuidedPlans') {
              return true
            }
          }
          else {
            if (openDrawer.open && openDrawer.componentId === 'GuidedPlans') {
              return true
            }
          }
          return false;
        }
      },
     
      {
        text: 'Fitness Placement Quiz',
        cb: () => handleCallBackFunction('FitnessQuiz'),
        imageName: 'Quiz.png',
        ids: [],
        isActive: () => {
          if (openDrawer.componentId === 'FitnessQuiz') {
            return true;
          }
          return false;
        }
      },
      {
        text: 'Information',
        imageName: 'info.png',
        cb: () => {
          handleCloseDrawer();
          history.push('/information')
        },
        ids: [],
        isActive: () => {
          if (location.pathname === '/information' && !openDrawer.componentId) {
            return true;
          }
          return false;
        }
      }
    ]
  }
  else {
    firstSection = [
      {
        text: 'White Board',
        cb: () => isSinnglePoint && !isFreeMember ? dispatch(openOhNo()) : handleOpenDrawer('SwitchToAuto'),
        imageName: 'bluewhiteboard.png',
        extraWidth: true,
        ids: [9],
        isActive: () => {
          if (location.pathname === '/') {
            if (openDrawer.open && openDrawer.componentId !== 'SwitchToAuto') {
              return false
            }
            if (9 === levelId) {
              return true
            }
            if (openDrawer.open && openDrawer.componentId === 'SwitchToAuto') {
              return true;
            }
          }
          else {
            if (openDrawer.open && openDrawer.componentId === 'SwitchToAuto') {
              return true
            }
          }
          return false;
        }
      },
      {
        text: 'Guided Plans',
        cb: () => handleCallBackFunction('GuidedPlans'),
        imageName: 'GuidedPlans.png',
        ids: [0, 1, 2, 3, 4],
        isActive: () => {
          if (location.pathname === '/') {
            if (openDrawer.open && openDrawer.componentId !== 'GuidedPlans') {
              return false
            }
            if ([0, 1, 2, 3, 4].indexOf(levelId) > -1) {
              return true
            }
            if (openDrawer.open && openDrawer.componentId === 'GuidedPlans') {
              return true
            }
          }
          else {
            if (openDrawer.open && openDrawer.componentId === 'GuidedPlans') {
              return true
            }
          }
          return false;
        }
      },
      {
        text: 'Build Your Own Workout',
        cb: () => handleCallBackFunction('BuildYourOwn'),
        imageName: 'BYO.png',
        ids: [10],
        drawerId: 'BuildYourOwn',
        isActive: () => {
          if (location.pathname === '/') {
            if (openDrawer.open && openDrawer.componentId !== 'BuildYourOwn') {
              return false
            }
            if ([10].indexOf(levelId) > -1) {
              return true
            }
            if (openDrawer.open && openDrawer.componentId === 'BuildYourOwn') {
              return true
            }
          }
          else {
            if (openDrawer.open && openDrawer.componentId === 'BuildYourOwn') {
              return true
            }
          }
          return false;
        }
      },
      {
        text: 'Thrive Nutrition',
        cb: () => handleCallBackFunction('Thrive', isThriveUser),
        imageName: 'nutrition.png',
        ids: [],
        isActive: () => {
          if (openDrawer.componentId === 'Thrive' && isThriveUser) {
            return true;
          }
          return false;
        }
      },
      {
        text: 'Workout History',
        cb: () => handleCallBackFunction('History'),
        imageName: 'history.png',
        ids: [],
        isActive: () => {
          if (openDrawer.componentId === 'History') {
            return true;
          }
          return false;
        }
      },
      {
        text: 'Fitness Placement Quiz',
        cb: () => handleCallBackFunction('FitnessQuiz'),
        imageName: 'Quiz.png',
        ids: [],
        isActive: () => {
          if (openDrawer.componentId === 'FitnessQuiz') {
            return true;
          }
          return false;
        }
      },
      {
        text: 'Information',
        imageName: 'info.png',
        cb: () => {
          handleCloseDrawer();
          history.push('/information')
        },
        ids: [],
        isActive: () => {
          if (location.pathname === '/information' && !openDrawer.componentId) {
            return true;
          }
          return false;
        }
      }
    ]
  }


  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={clsx([classes.toolbar, classes.pointer], { [classes.paddingOpen]: open })} onClick={handleDrawer}>
          {open ? <GBWhiteHero /> : <GbWhite />}
        </div>
        {

        }
        <Collapse in={open}>
          <div className={classes.toolbar}>
            <Typography variant="h5" className={classes.title}>
              Hi {userNameFullName}!
            </Typography>
          </div>
        </Collapse>
        <Collapse in={open}>
          <div className={classes.toolbar}>
            <Typography variant="body2" className={classes.title} style={{ fontSize: 16 }}>
              {props.userChoosenLevel}
            </Typography>
          </div>
        </Collapse>
        <List>
          {
            isSinnglePoint
              ? <ListItem button onClick={() => {
                handleCloseDrawer();
                history.push('/my-courses')
              }}
                className={
                  clsx(classes.secondSection)
                }
              >
                <ListItemIcon
                  style={{
                    color: 'white',
                    maxWidth: 32,
                    marginBottom: 8,
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                  className={clsx({
                    [classes.isActive]:
                      ('My Courses' === props.userChoosenLevel || location.pathname === '/my-courses') && !openDrawer.componentId && location.pathname !== '/information' && open,
                    [classes.isActiveClosed]:
                      ('My Courses' === props.userChoosenLevel || location.pathname === '/my-courses') && !openDrawer.componentId && location.pathname !== '/information' && !open,
                  })}>
                  <img
                    className={
                      clsx(
                        classes.iconImg,
                        {
                          [classes.extraWidth]: open,
                          [classes.extraWidthClosed]: !open,
                        }
                      )
                    }
                    src={`https://gymfit-images.s3.amazonaws.com/General/SPP.svg`}
                    alt={'My Courses'}
                    style={{ maxWidth: 56 }}
                  />
                </ListItemIcon>
                <Collapse in={open}>
                  <ListItemText
                    style={{ color: 'white', whiteSpace: 'normal', textAlign: 'center', minWidth: 208, textShadow: 'rgb(0 0 0 / 55%) 1px 1px 8px' }}
                    primaryTypographyProps={{ variant: "body2", style: { fontSize: 16 } }}
                    primary='My Courses'
                  />
                </Collapse>
              </ListItem>
              : null
          }
          {firstSection.map((section, index) => (
            <ListItem button key={section.text} onClick={section.cb} className={clsx(classes.secondSection)}>
              <ListItemIcon
                style={{ color: 'white', maxWidth: 32, marginBottom: 8, justifyContent: 'center', position: 'relative' }}
                className={clsx({
                  [classes.isActive]: section.isActive() && open,
                  [classes.isActiveClosed]: section.isActive() && !open,
                })}>
                <img
                  className={
                    clsx(
                      classes.iconImg,
                      {
                        [classes.extraWidth]: section.extraWidth && open,
                        [classes.extraWidthClosed]: section.extraWidth && !open
                      }
                    )
                  }
                  src={`https://gymfit-images.s3.amazonaws.com/General/${section.imageName}`}
                  alt={section.text}
                  style={{ ...section.styles }}
                />
              </ListItemIcon>
              <Collapse in={open}>
                <ListItemText style={{ color: 'white', whiteSpace: 'normal', textAlign: 'center', minWidth: 208, textShadow: 'rgb(0 0 0 / 55%) 1px 1px 8px' }} primaryTypographyProps={{ variant: "body2", style: { fontSize: 16 } }} primary={section.text} />
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <TestingDrawer {...openDrawer} toggle={handleCloseDrawer} isDrawerOpen={open} />
    </>
  );
}
