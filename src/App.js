import React, {useEffect, useState} from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Hidden } from '@material-ui/core';

// Component imports
import Header from './Components/Header'
import Footer from './Components/Footer'
import MobileFooter from './Components/MobileFooter'
import Interceptor from  './Components/UtilComponents/Interceptor'
import SnackBar from './Components/SnakBar'

// Page imports
import Login from './Containers/Login'
import WelcomePage from './Containers/WelcomePage'
import Dashboard from './Containers/Dashboard'
import GetStarted from './Containers/OnBoarding'
import ClassFinder from './Containers/ClassFinder'
import History from './Containers/History'
import Advocates from './Containers/Advocates'
import EqiupmentList from './Containers/EqiupmentList'
import LearnMoreLevels from './Containers/LearnMoreLevels'
import ThriveLessons from './Containers/ThriveLessons'
import ThriveTasks from './Containers/ThriveTasks'
import ThriveProfile from './Containers/ThriveProfile'
import AdminDashboard from './Containers/AdminDashboard';
import EditUser from './Containers/AdminDashboard/EditUser';
import NewMemberSite from './Containers/NewMemberSite'
import CourseLibrary from './Containers/CourseLibrary'

import DemoModal from './Components/DemoModal/DemoModal'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Redux Actions
import * as actions from './Store/Action';
import {Reset} from './Store/Action/LegacyAction'
import firebase from './HOC/firebase';
import AlertNotice from './HOC/Alert';

const db = firebase.database();

function App(props) {
  console.log('App props 12-29-2025 3', props)
  let routes;
  const { checkLogin } = props;

  const [isMaintenance, setIsMaintenance] = useState({})
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => checkLogin(), [checkLogin])

  useEffect(() => {
    const ref = db.ref('isMaintenance/');

    ref.get('isMaintenance', (res) => {
      setIsMaintenance(res)
    })

    return () => ref.off()
  }, [])

  const { isAuth, logout, resetLegacy } = props;

  useEffect(() => {
    const ref = db.ref('isMaintenance/');
    if (process.env.REACT_APP_IS_PRODUCTION === 'production') {
      ref.on('value', (snapshot) => {
        let res = snapshot.val();

        if (res.refresh && !window.location.hash) {
          window.location.hash = 'reloaded';
          window.location.reload();
        }

        if (!res.refresh && window.location.hash) {
          window.location.hash = '';
        }

        if (isAuth && res.forceLogout) {
          logout();
          resetLegacy();
        }

        if (isAuth && res.forceLogout && res.maintence) {
          logout();
          resetLegacy();
        }

        let alertModalShown = localStorage.getItem('AlertModalShown');

        if (res.showMaintenceModal && !alertModalShown) {
          setShowAlertModal(true)
        }

        if (!res.showMaintenceModal) {
          localStorage.removeItem('AlertModalShown')
        }

        setIsMaintenance(snapshot.val())
      })
    }
    return () => ref.off()
  }, [isAuth, logout, resetLegacy])

  const handleModalClose = () => {
    localStorage.setItem('AlertModalShown', true);
    setShowAlertModal(false)
  }

  if (isMaintenance.maintenance) {
    routes = (
      <Switch>
        <Route path="/" render={(props) => <Login isMaintenance={isMaintenance} {...props}/>} />
        <Route render={() => <Redirect to="/" />}/>
      </Switch>
    );
  }


  else if (props.showAllAccessSite && props.isAuth) {
    routes = (
      <Interceptor>
        <Switch>
          <Route path="/edit-user" exact component={EditUser} />
          <Route path="/admin" exact component={AdminDashboard} />
          <Route path="/" component={NewMemberSite} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
        <DemoModal />
      </Interceptor>
    );
  }

  else if (props.isAuth) {
    routes = (
      <Interceptor>
        <Header />
        <Switch>
          <Route path="/course-library" exact component={CourseLibrary}/>
          <Route path="/edit-user" exact component={EditUser}/>
          <Route path="/admin" exact component={AdminDashboard}/>
          <Route path="/thrive-profile" exact component={ThriveProfile}/>
          <Route path="/thrive-tasks" exact component={ThriveTasks}/>
          <Route path="/thrive-lessons" exact component={ThriveLessons}/>
          <Route path="/eqiupment-list" exact component={EqiupmentList}/>
          <Route path="/advocates" exact component={Advocates} />
          <Route path="/learn-more" exact component={LearnMoreLevels}/>
          <Route path="/history" exact component={History}/>
          <Route path="/class-finder/:category" exact component={ClassFinder}/>
          <Route path="/class-finder" exact component={ClassFinder}/>
          <Route path="/get-started" exact component={GetStarted}/>
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/" exact render={(props) => <WelcomePage isMaintenance={isMaintenance} {...props}/>} />
          <Route render={() => <Redirect to="/" />}/>
        </Switch>
        <Hidden only={['xs', 'sm']}>
          <Footer />
        </Hidden>
        <Hidden only={['md', 'lg', 'xl']}>
          <MobileFooter/>
        </Hidden>
        <DemoModal/>
      </Interceptor>
    );
  }
  else {
    routes = (
      <Switch>
        <Route path="/" render={(props) => <Login isMaintenance={isMaintenance} {...props}/>} />
        <Route render={() => <Redirect to="/" />}/>
      </Switch>
    );
  }
  return (
    <div className="App">
      {routes}
      <SnackBar/>
      <AlertNotice open={showAlertModal} message={isMaintenance.modalNote} handleClose={ handleModalClose }/>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuth: state.login.auth,
    showAllAccessSite: state.login.showAllAccessSite,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkLogin: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.Logout()),
    resetLegacy: () => dispatch(Reset())
  }
}

export default withRouter( connect( mapStateToProps,mapDispatchToProps )( App ) );
