import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect, useSelector } from 'react-redux';

import RandomImage from './images'

import * as actions from '../../Store/Action/index';
import LoginForm from '../../Components/LoginComponents/LoginForm'
import SnackBar from '../../Components/SnakBar';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
  },
  image: {
    backgroundImage: `url(${RandomImage()})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}));

const SignInSide = (props) => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState({email: '', valid:true});
  const [showError, setShowError] = useState({ show: false, message: '' });

  const didTryAutoLogin = useSelector(state => state.login.didTryAutoLogin)

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userName.email !== '') {
      props.onLogin(userName.email, password);
      setUserName({ email: '', valid: true });
      setPassword('')
    }
    else {

      setShowError({
        show: true,
        message: 'Please Enter an Email and Password.'
      });

      setTimeout(() =>
        setShowError({ show: false, message: '' })
      , 2500);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleUserName = (e) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setUserName({
      email: e.target.value,
      valid: pattern.test(e.target.value)
    });
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} className={classes.image} />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {
          !didTryAutoLogin
            ? <CircularProgress className={classes.loader} />
            : <LoginForm
                handleUserName={handleUserName}
                handlePassword={handlePassword}
                handleFormSubmit={handleFormSubmit}
                validEmail={userName.valid}
                isMaintenance={props.isMaintenance}
              />
        }
      </Grid>
      <SnackBar
        open={showError.show}
        message={showError.message}
        variation='error'
      />
    </Grid>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.Login(email, password))
  }
}

const mapStateToProps = state => {
  return {
    loading: state.login.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(SignInSide);
