import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core';
import {blue} from '@material-ui/core/colors'
import * as serviceWorker from './serviceWorker';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import LogRocket from 'logrocket';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { LoginReducer } from './Store/Reducers/Login.js'
import { CalendarReducer } from './Store/Reducers/Calendar'
import { AllClassesReducer } from './Store/Reducers/AllClasses'
import { AllSubClassesReducer } from './Store/Reducers/AllSubClasses'
import { LegacyReducer } from './Store/Reducers/LegacyModalReducer'
import { DemoModalReducer } from './Store/Reducers/DemoModalReducer'
import { FreeMemberReducer } from './Store/Reducers/FreeMemberReducer'
import { LevelsReducer } from './Store/Reducers/LevelsReducer'
import { WorkoutBuilderReducer } from './Store/Reducers/WorkoutBuilderReducer'
import { OhNoReducer } from './Store/Reducers/OhNoReducer'
import { OpenDrawerReducer } from './Store/Reducers/OpenDrawerReducer'

// TODO: Change this line beofre pushing to prod
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.REACT_APP_IS_PRODUCTION === 'production') {
  Sentry.init({
    dsn: "https://fef006e1f68e41cb864651b890bc8832@o32340.ingest.sentry.io/5747605",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  composeEnhancers = compose;
}

const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

if (process.env.REACT_APP_TESTING === 'true') {
  LogRocket.init('test-group/gymfit');
}


// TODO: Add more reducers here if need be
const rootReducer = combineReducers({
  login: LoginReducer,
  calendar: CalendarReducer,
  classes: AllClassesReducer,
  subClasses: AllSubClassesReducer,
  legacyCourse: LegacyReducer,
  demoModal: DemoModalReducer,
  freeMember: FreeMemberReducer,
  levels: LevelsReducer,
  buildYourOwn: WorkoutBuilderReducer,
  OhNo: OhNoReducer,
  OpenDrawer:OpenDrawerReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, LogRocket.reduxMiddleware()), sentryReduxEnhancer));

let theme = createTheme({
  typography: {
    fontFamily: '"Oswald", "Open Sans", sans-serif',
    "fontWeightLight": 200,
    "fontWeightRegular": 300,
    "fontWeightMedium": 400
  },
  palette: {
    primary: {
      main: blue[600],
      dark: blue[700]
    }
  }
});

theme = responsiveFontSizes(theme);

theme.typography.body1 = {
  fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
}

const GymFit = (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>
);

ReactDOM.render(GymFit , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
