import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch, useLocation} from 'react-router-dom';

import { getCalanderDate } from '../../Components/UtilComponents/GetCurrentWeek';
import Drawer from '../../Components/FreeMemeberComp/Drawer';
import MobileDrawer from '../../Components/FreeMemeberComp/Drawer/MobileDrawer';
import Select from '../../Components/FreeMemeberComp/Select'
import AvatarDropDown from '../../Components/FreeMemeberComp/AvatarDrop';
import AutoPilot from '../../Components/FreeMemeberComp/AutoPilot';
import BeginnerPlan from '../../Components/FreeMemeberComp/BeginnerPlan';
import LevelsPlan from '../../Components/FreeMemeberComp/Levels';
import BuildYourOwn from '../../Components/FreeMemeberComp/BuildYourOwn';
import InitialPage from '../../Components/FreeMemeberComp/InitialPage';

import CourseLibrary from '../CourseLibrary'
import EqiupmentList from '../EqiupmentList'
import Advocates from '../Advocates';
import Information from '../Information';
import HowTo from '../HowTo';
import MyCourses from '../MyCourses';

import OhNoModal from '../../Components/OhNoModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    padding: '32px 0px',
    background: '#E6E6E6',
    overflowY: 'scroll',
    position: 'relative',
    [theme.breakpoints.down(813)]: {
      padding: '56px 0px 0px',
    }
  },
  isMobileStyles: {
    marginLeft: theme.spacing(9) + 1,
    [theme.breakpoints.up(813)]: {
      marginLeft: theme.spacing(8) + 1,
    },
    [theme.breakpoints.down(426)]: {
      marginLeft: theme.spacing(7) + 1,
    },
  },
  forceColor: {
    color: '#6C6C6C'
  },
  adText: {
    color: '#FF9435',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 400,
    marginBottom: 16
  },
  headerArea: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '18px',
    [theme.breakpoints.down(813)]: {
      display: 'none'
    },
  },
  button: {
    background: "linear-gradient(18deg, #fcb14e 0%, #f05621 100%)",
    color: 'white',
    padding: '4px 30px',
    fontSize: '18px',
  },
  titleDiv: {
    width: 'fit-content',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      marginTop: 8
    },
    marginLeft: 48
  },
  bottomAdText: {
    padding: '12px 0'
  },
  dropDownDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down(813)]: {
      display: 'none',
    },
    position: 'relative',
  }
}));

export default function FreeMembers() {
  const classes = useStyles();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(813));
  const isTablet = useMediaQuery(theme.breakpoints.down(1025));
  const timeZone = useSelector(state => state.login.timezone);
  const userLevel = useSelector(state => state.login.userLevel);
  const isFreeMember = useSelector(state => state.login.isFreeMember);
  const isAllAccessUser = useSelector(state =>  state.login.isAllAccessUser)

  const firstAndLast = [getCalanderDate(timeZone, 'MMMM DD')[0], getCalanderDate(timeZone, 'MMMM DD')[6]];
  const location = useLocation();
  const [state, setState] = useState({
    view: 'Week View',
  });

  const [ohNoModal, setOhNoModal] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const HandleRender = () => {
    switch (userLevel) {
      case 'White Board':
        return <AutoPilot state={state} />
      case 'Beginner':
        return <BeginnerPlan state={state} isMobile={isMobile} />
      case 'Intermediate One':
        return <LevelsPlan state={state} isMobile={isMobile} />
      case 'Intermediate Two':
        return <LevelsPlan state={state} isMobile={isMobile} />
      case 'Advanced One':
        return <LevelsPlan state={state} isMobile={isMobile} />
      case 'Advanced Two':
        return <LevelsPlan state={state} isMobile={isMobile} />
      case 'Build Your Own':
        return <BuildYourOwn state={state} isMobile={isMobile} />
      case 'My Courses':
        return <Redirect to="/my-courses" />
      case 'New User':
        return <InitialPage />
      default:
        return <InitialPage />
    }
  }

  const handleOhNoModal = () => {
    setOhNoModal(true);
  }

  return (
    <>
      {
        isMobile
          ? <MobileDrawer isMobile={isMobile} userChoosenLevel={userLevel} isFreeMember={isFreeMember} handleOhNoModal={handleOhNoModal} />
          : isTablet ? <Drawer isMobile={isTablet} userChoosenLevel={userLevel}  isFreeMember={isFreeMember} handleOhNoModal={handleOhNoModal}/> : null
      }
      <div className={clsx(classes.root, { [classes.isMobileStyles]: isTablet || isMobile })}>
        <CssBaseline />
        {
          !isMobile && !isTablet
            ? <Drawer userChoosenLevel={userLevel} isFreeMember={isFreeMember} handleOhNoModal={handleOhNoModal} />
            : null
        }
        <main className={classes.content}>
          <Grid container>
            {
              userLevel !== 'New User' && location.pathname === '/'
                ? <Grid item xs={8} sm={11} md={11} lg={11} className={classes.headerArea}>
                  <div className={classes.titleDiv} >
                    <Typography variant="h4" className={classes.forceColor} style={{ fontWeight: 400 }}>
                      {firstAndLast[0]} - {firstAndLast[1]}
                    </Typography>
                  </div>
                  {
                    isMobile
                      ? null
                      : <div className={classes.buttonDiv}>
                        <Select state={state} handleChange={handleChange} />
                      </div>
                  }
                </Grid>
                : <Grid item xs={8} sm={11} md={11} lg={11} className={classes.headerArea}/>
            }

            <div style={{ flex: 1 }} />
            <Grid item xs={4} sm={1} md={1} lg={1} className={classes.dropDownDiv}>
              <AvatarDropDown />
            </Grid>
            <Switch>
              <Route path="/my-courses" exact>
                {
                  isAllAccessUser
                    ? <Redirect to="/" />
                    : <MyCourses basicLayout />
                }
              </Route>
              <Route path="/learn-more/:route" component={HowTo} exact/>
              <Route path="/information" exact>
                <Information basicLayout />
              </Route>
              <Route path="/advocates" exact>
                <Advocates basicLayout />
              </Route>
              <Route path="/eqiupment-list" exact>
                <EqiupmentList basicLayout />
              </Route>
              <Route path="/course-library" exact >
                {
                  isFreeMember
                    ? <Redirect to="/" />
                    : <CourseLibrary basicLayout />
                }
              </Route>
              <Route path="/" exact>
                {
                  isFreeMember
                    ? <AutoPilot state={state} />
                    : <HandleRender />
                }
              </Route>
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Grid>
        </main>
      </div>
      <OhNoModal open={ohNoModal} handleClose={() => setOhNoModal(false)} allAccess />
    </>
  );
}
