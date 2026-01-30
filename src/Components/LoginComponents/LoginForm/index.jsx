import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core'

import Copyright from "./Copyright";
import SnackBar from '../../SnakBar';
import EmailForm from './EmailReset';
import CreateAccount from './CreateAccount';
import PasswordRest from './PasswordReset'
import ContactUs from "../../FreeMemeberComp/Drawer/Support";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
    maxWidth: '500px',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: '1rem',
    letterSpacing: 1
  },
  logo: {
    height: "84px",
    background: "url(/images/log_in/GFmarkandName.png) top center no-repeat",
    width: "100%",
    maxWidth: "300px",
    backgroundSize: "contain",
    backgroundPosition: "50% 50%",
  },
  loader: {
    marginTop: '32px'
  }
}));

const LoginFrom = (props) => {
  const classes = useStyles();

  const LinkRef = React.forwardRef((props, ref) =>
    <div style={{ display: 'contents' }} ref={ref}>
      <NavLink {...props} />
    </div>
  )
  let contactForm = false
  let loginForm;

  if (props.loading) {
    loginForm = (
      <CircularProgress className={classes.loader} />
    );
  }
  else {
    loginForm = (
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(event) => props.handleUserName(event)}
          error={!props.validEmail}
          helperText={props.validEmail ? '' : 'Please Enter a Valid Email'}
          inputProps={{ 'data-hj-whitelist': 'true' }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(event) => props.handlePassword(event)}
          inputProps={{ 'data-hj-whitelist': 'true' }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(event) => props.handleFormSubmit(event)}
          disabled={!props.validEmail}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs style={{ textAlign: "left" }}>
            <Link component={LinkRef} to="/reset" exact variant="body1">
              Forgot your password?
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
        <SnackBar open={props.fail} variation='error' />
      </form>
    );
  }


  function handleContactForm(event) {
    let contactFormDiv = document.querySelectorAll("#contactFormDiv")[0]
    let displayOfContactForm = contactFormDiv.style.display
    if (displayOfContactForm == "none") {
      contactFormDiv.style.display = "grid"
      contactFormDiv.style.alignItems = "center"
    }else{
      contactFormDiv.style.display = "none"
    }


  }

  return (
    <>
      <div className={classes.paper} id="loginFormDiv">
        <NavLink to="/" exact className={classes.logo} />
        {
          props.isMaintenance && props.isMaintenance.showHeadsUp && !props.isMaintenance.maintenance
            ? <Typography variant='body2' align='center' style={{ marginTop: 8, letterSpacing: '0.2px', color: 'red' }} >{props.isMaintenance.headsUp}</Typography>
            : null
        }
        {
          props.isMaintenance && props.isMaintenance.maintenance
            ? <Typography variant='h5' align='center' style={{ marginTop: 8, letterSpacing: '0.2px', color: 'red' }} >{props.isMaintenance.note}</Typography>
            : <Switch>
              <Route path="/create-account" exact component={CreateAccount} />
              <Route path="/reset" exact component={EmailForm} />
              <Route path="/reset-password/:id/:token" exact component={PasswordRest} />
              <Route path="/" exact>
                {loginForm}
              </Route>
              <Route render={() => <Redirect to="/" />} />
            </Switch>
        }
      </div>
      <div style={{zIndex:"2", position: "absolute", bottom: "0", right: "0", margin:"0 16px" }}>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(event) => handleContactForm(event)}
        >
          Contact Us
        </Button>




      </div>
      <div id="contactFormDiv" style={{ display: "none", position:"absolute",zIndex:"1" }}>
        <ContactUs />
      </div>
    </>
  );
};


const mapStateToProps = state => {
  return {
    loading: state.login.loading,
    fail: state.login.fail
  }
}

export default connect(mapStateToProps)(React.memo(LoginFrom));
