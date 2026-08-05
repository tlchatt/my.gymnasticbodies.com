import React, {useState} from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import * as Sentry from "@sentry/react";

import { showToast } from '../../Store/Action/calendarActions'
import { logEvent } from '../../util/clientLogger';

import RandomImage from '../Login/images';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${RandomImage()})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing('auto', 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    margin: '0 18px',
    width: '75%',
    marginTop: 8
  }
}))

const AdminDashboard = (props) => {
  const classes = useStyles();
  const isAdmin = useSelector(state => state.login.isAdmin ? true : false);
  const webToken = useSelector(state => state.login.webToken);
  const [userName, setUserName] = useState({ email: '', valid: true });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const findUser = () => {
    if (userName.email !== '') {
      // This screen backed onto the AWS thrive-admin endpoints, which are gone. It is also
      // already unreachable: state.login.isAdmin is hardcoded false in both surviving login
      // paths, so nobody can open /admin. Rather than call a dead host, say where the
      // capability lives now — the app.gymnasticbodies.com admin panel, which has real
      // admin auth instead of a client-side flag.
      logEvent('my.admin.moved', { data: { screen: 'thrive-admin-lookup' } });
      dispatch(showToast('Thrive admin has moved to app.gymnasticbodies.com/admin', 'error'))
    } else {
      dispatch(showToast('Please enter a valid email.', 'error'))
    }
  }

  const handleUserName = (e) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setUserName({
      email: e.target.value,
      valid: pattern.test(e.target.value)
    });
  }

  const AdminDash = (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ display: 'flex' }}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Admin Dashboard
          </Typography>
          <Divider className={classes.divider} />
          <Box mt={1}>
            <Typography variant="body1" align="center" style={{marginBottom: 8}}>
              Find the user you would like to edit by entering their email.
          </Typography>
          </Box>
          {
            loading
              ? <CircularProgress />
              : <div className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => handleUserName(event)}
                  error={!userName.valid}
                  helperText={userName.valid ? '' : 'Please Enter a Valid Email'}
                  value={userName.email}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={findUser}
                  disabled={!userName.valid}
                >
                  Find User
              </Button>
              </div>
          }
        </div>
      </Grid>
    </Grid>
  )

  return isAdmin ? AdminDash : <Redirect to="/" />;
}


export default AdminDashboard;
