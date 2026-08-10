import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import * as Sentry from "@sentry/react";

import { logEvent } from '../../../../util/clientLogger';
import Aux from '../../../../HOC/aux';
import Copyright from "../Copyright";
import SnackBar from '../../../SnakBar';


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
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
  },
  divider: {
    margin: '0 18px'
  }
}));

const PassWordReset = (props) => {
  const classes = useStyles();
  const [done, setDone] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [PassWordOne, setPassWordOne] = useState('');
  const [PassWordTwo, setPassWordTwo] = useState('');
  const [fail, setFail] = useState({ isFaield: false, message: '', variation: 'error' });
  const NEWAPI = process.env.REACT_APP_API_NEW
  let form;

  useEffect(() => {
    // The old AWS link-validation GET set done=false in BOTH its then and its catch, so it
    // never actually gated anything. Dropped rather than reimplemented — the reset POST
    // below validates the token server-side, which is the check that matters.
    setDone(false);
  }, [props.match.params.id, props.match.params.token]);

  const LinkRef = React.forwardRef((props, ref) =>
    <div style={{ display: 'contents' }} ref={ref}>
      <NavLink {...props} />
    </div>
  );

  const handlePasswordOne = (e) => {
    if (e.target.value.match(/^[a-zA-Z0-9!$#]*$/i) && e.target.value.length <= 20) {
      setPassWordOne(e.target.value);
    }
  }
  const handlePasswordTwo = (e) => {
    if (e.target.value.match(/^[a-zA-Z0-9!$#]*$/i) && e.target.value.length <= 20) {
      setPassWordTwo(e.target.value);
    }
  }
  // TODO: Need to connect back end here and revise the logic
  const handleClick = (e) => {
    e.preventDefault();

    if (PassWordOne === '' || PassWordTwo === '') {
      setFail({
        isFaield: true,
        message: 'Please enter a password.',
        variation: 'error'
      });

      setTimeout(() => setFail({
        isFaield: false,
        message: '',
        variation: 'error'
      }), 2500);
    }
    else if (PassWordOne === PassWordTwo && !(PassWordOne === '' || PassWordTwo === '')) {
      const config = {
        headers: {
          // Do NOT send Access-Control-Allow-Origin here — it is a RESPONSE header, and
          // sending it on the request forced a CORS preflight the reset route didn't
          // satisfy, so the browser blocked every save ("Network Error"). This was the
          // dominant reset-password failure.
          "Content-Type": "application/json",
        }
      }
      // Neon only. This previously POSTed to AWS and used Neon merely as a catch-fallback.
      const data = {
        userId: props.match.params.id,
        password: PassWordOne,
        confirmPassword: PassWordTwo,
        token: props.match.params.token
      }

      Axios.post(NEWAPI + '/api/user/resetPassword', data, config)
        .then(res => {
          logEvent('my.auth.reset_password.success', { data: { userId: props.match.params.id } });
          setDone(true);
          setFail({ isFaield: true, message: 'Password Saved.', variation: 'success' });
          setTimeout(() => {
            setFail({ isFaield: false, message: '', variation: 'success' })
            setRedirect(true)
          }, 2500);
        })
        .catch(err => {
          // This is now the ONLY way a member can recover an account, so a failure here
          // is a lockout. Capture enough to tell an expired token from a server fault.
          logEvent('my.auth.reset_password.failed', {
            data: {
              userId: props.match.params.id,
              status: err?.response?.status ?? null,
              serverError: err?.response?.data?.error ?? null,
              message: err?.message,
            },
          });
          Sentry.captureException(err);
          setFail({ isFaield: true, message: 'Failed to Save Password', variation: 'error' });
          setTimeout(() => {
            setFail({ isFaield: false, message: '', variation: 'error' })
          }, 2500);
        });
    }
  }

  if (!done) {
    form = (
      <Aux>
        <Box mt={2} mb={2}>
          <Box mb={1}>
            <Typography variant="h6" align="center">
              Reset Your Password.
            </Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box mt={1}>
            <Typography variant="body1" align="center">
              Please enter and confirm your new password below.
            </Typography>
            <Typography variant="body1" align="center">
              Min 9 characters, Up to 20 characters, A-Z, a-z, 0-9 and allowed special characters are: !$#
            </Typography>
          </Box>
        </Box>
        <TextField
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth
          name="new-password"
          label="New Password"
          type="password"
          id="new-password"
          autoComplete="new-password"
          disabled={done}
          onChange={(event) => handlePasswordOne(event)}
          value={PassWordOne}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="new-password"
          onChange={(event) => handlePasswordTwo(event)}
          error={PassWordOne !== PassWordTwo}
          disabled={done}
          helperText={PassWordOne !== PassWordTwo ? 'Password Does Not Match' : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(event) => handleClick(event)}
          disabled={PassWordOne !== PassWordTwo || done}
        >
          Change Password
        </Button>
        <Grid container>
          <Grid item xs style={{ textAlign: "left" }}>
            <Link component={LinkRef} to="/" exact variant="body1">
              Return To Login
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Aux>
    );
  }
  else {
    form = (<CircularProgress style={{ margin: 'auto' }} />);
  }

  return (
    <form className={classes.form} noValidate>

      {form}

      <SnackBar
        open={fail.isFaield}
        message={fail.message}
        variation={fail.variation}
      />

      {redirect ? <Redirect to='/' /> : ''}

    </form>
  );
};

export default PassWordReset;
