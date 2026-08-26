import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector, useDispatch } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import { useHistory, useLocation } from 'react-router-dom';

import { openOhNo } from '../../../../Store/Reducers/OhNoReducer';
import { closeDrawer } from '../../../../Store/Reducers/OpenDrawerReducer'
import { continutePreviosLevel, setSection } from '../../../../Store/Action/LevelsActions';

import { GBWhiteHero } from '../../../GymFitIcons/gbIcons';
import AvatarDropDown from '../../AvatarDrop';

import TestingDrawer from '../TestingDrawer';


const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'rgba(255,89,2,1)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 0,
    padding: 8
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: 'linear-gradient(173deg, rgba(255,89,2,1) 39%, rgba(255,203,121,1) 100%)',
    overflowX: 'hidden',
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: 'hidden',
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
      width: theme.spacing(9) + 1,
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
    flexDirection: 'column'
  },
  paddingOpen: {
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.easeInOut,
    }),
  },
  pointer: { cursor: 'pointer' },
  iconImg: {
    maxWidth: 35,
  },
  extraWidth: {
    maxWidth: 70
  },
  extraWidthClosed: {
    maxWidth: 60,
  },
  isActive: {
    '&::before': {
      content: "''",
      width: 52,
      height: 52,
      MozBorderRadius: '50%',
      WebkitBorderRadius: '50%',
      borderRadius: '50%',
      backgroundColor: "#FFE693",
      position: 'absolute',
      zIndex: -1,
      top: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    '&::after': {
      content: "''",
      width: 64,
      height: 64,
      MozBorderRadius: '50%',
      WebkitBorderRadius: '50%',
      borderRadius: '50%',
      backgroundColor: "#FF9435",
      position: 'absolute',
      zIndex: -2,
      top: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  isActiveClosed: {
    '&::before': {
      content: "''",
      width: 42,
      height: 42,
      MozBorderRadius: '50%',
      WebkitBorderRadius: '50%',
      borderRadius: '50%',
      backgroundColor: "#FFE693",
      position: 'absolute',
      zIndex: -1,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    '&::after': {
      content: "''",
      width: 52,
      height: 52,
      MozBorderRadius: '50%',
      WebkitBorderRadius: '50%',
      borderRadius: '50%',
      backgroundColor: "#FF9435",
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

export default function MobileDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.isMobile ? false : true);
  const userNameFullName = useSelector(state => state.login.name)
  const levelId = useSelector(state => state.login.levelId)
  const lastGuidedLevel = useSelector(state => state.login.lastGuidedLevel)
  const apLevel = useSelector(state => state.login.apLevel)
  const section = useSelector(state => state.login.section)
  const isSinnglePoint = useSelector(state => !state.login.isAllAccessUser);
  const isThriveUser = useSelector(state => state.login.isThriveUser);
  const { isFreeMember } = props

  const [openDrawer, setOpenDrawer] = useState({ open: false, componentId: '' });

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const OpenDrawerRedux = useSelector(state => state.OpenDrawer);

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

  // Switch home-screen section directly — no "are you sure?" confirm modal.
  const goToSection = (sec) => {
    dispatch(setSection(sec));
    handleCloseDrawer();
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  const handleOpenDrawer = (id) => {
    // Returning to Guided Plans from another section: restore the remembered guided level
    // directly instead of forcing the level chooser. Tapping Guided Plans while already in
    // Guided still opens the chooser to switch levels.
    if (id === 'GuidedPlans' && section !== 'guided' && between(lastGuidedLevel, 0, 4)) {
      dispatch(continutePreviosLevel(lastGuidedLevel));
      handleCloseDrawer();
      if (location.pathname !== '/') {
        history.push('/');
      }
      return;
    }
    if (location.pathname !== '/') {
      if (section === 'guided' && id === 'GuidedPlans') {
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


  // Unified drawer (2026-07): every user type sees the same feature set — the
  // postAWS reduced list is gone now that all sections run on the Neon workout API.
  // Free-member gating (openOhNo) and the isThriveUser gate are unchanged.
  const firstSection = [
    {
      text: 'White Board',
      cb: () => isSinnglePoint && !isFreeMember ? dispatch(openOhNo()) : goToSection('whiteboard'),
      imageName: 'bluewhiteboard.png',
      ids: [9],
      isActive: () => {
        if (location.pathname === '/') {
          if (openDrawer.open && openDrawer.componentId !== 'SwitchToAuto') {
            return false
          }
          if (section === 'whiteboard') {
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
          if (section === 'guided') {
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
      cb: () => isFreeMember ? dispatch(openOhNo()) : goToSection('byo'),
      imageName: 'BYO.png',
      ids: [10],
      drawerId: 'BuildYourOwn',
      isActive: () => {
        if (location.pathname === '/') {
          if (openDrawer.open && openDrawer.componentId !== 'BuildYourOwn') {
            return false
          }
          if (section === 'byo') {
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
    },
    {
      text: 'Contact Us',
      cb: () => handleCallBackFunction('ContactUs'),
      imageName: 'FocusGroups.png',
      ids: [],
      isActive: () => {
        if (openDrawer.componentId === 'ContactUs') {
          return true;
        }
        return false;
      }
    },
    {
      text: 'Courses',
      cb: () => handleCallBackFunction('Courses'),
      imageName: 'nutrition.png',
      ids: [],
      isActive: () => {
        if (openDrawer.componentId === 'Courses') {
          return true;
        }
        return false;
      }
    },
  ]



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <GBWhiteHero />
          </IconButton>
          <div style={{ flex: 1 }} />
          <AvatarDropDown isMobile={props.isMobile} />
        </Toolbar>
      </AppBar>
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
          {open ? <GBWhiteHero /> : null}
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
              {section === 'whiteboard'
                ? (apLevel === 5 ? 'White Board · All Levels'
                  : (apLevel >= 1 && apLevel <= 4 ? `White Board · Level ${apLevel}` : 'White Board'))
                : section === 'byo' ? 'Build Your Own'
                : props.userChoosenLevel}
            </Typography>
          </div>
        </Collapse>
        <List>
          {
            isSinnglePoint ? <ListItem button onClick={() => {
              handleCloseDrawer();
              history.push('/my-courses')
            }}
              className={classes.secondSection}
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
                        [classes.extraWidthClosed]: !open
                      }
                    )
                  }
                  src={`https://gymfit-images.s3.amazonaws.com/General/SPP.svg`}
                  alt={'My Courses'}
                  style={{maxWidth: 45}}
                />
              </ListItemIcon>
              <Collapse in={open}>
                <ListItemText style={{ color: 'white', whiteSpace: 'normal', textAlign: 'center', minWidth: 208, textShadow: 'rgb(0 0 0 / 55%) 1px 1px 8px' }} primaryTypographyProps={{ variant: "body2", style: { fontSize: 16 } }} primary='My Courses' />
              </Collapse>
            </ListItem>
              : null
          }
          {firstSection.map((section) => (
            <ListItem onClick={section.cb} button key={section.text} className={classes.secondSection}>
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
                />
              </ListItemIcon>
              <Collapse in={open}>
                <ListItemText style={{ color: 'white', whiteSpace: 'normal', textAlign: 'center', minWidth: 208 }} primaryTypographyProps={{ variant: "body2", style: { fontSize: 16 } }} primary={section.text} />
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <TestingDrawer {...openDrawer} toggle={handleCloseDrawer} isDrawerOpen={open}/>
    </div>
  );
}


