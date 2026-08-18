import React, { useState } from "react";
import Axios from 'axios'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Box } from "@material-ui/core";
import { NavLink,useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import * as Sentry from "@sentry/react";

import Copyright from "../Copyright";
import SnackBar from '../../../SnakBar'
import Aux from "../../../../HOC/aux"
import PassWordReset from "../PasswordReset";



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

const EmailForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState({ email: '', valid: true });
  const [fail, setFail] = useState({ isFaield: false, message: '', variation: 'error' });
  const [wait, setWait] = useState(false);
  let form;
  const LinkRef = React.forwardRef((props, ref) => <div style={{ display: 'contents' }} ref={ref}><NavLink {...props} /></div>);
  const NEWAPI = process.env.REACT_APP_API_NEW
  const handleChange = (e) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail({ email: e.target.value, valid: pattern.test(e.target.value) });
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    if (email.email !== '') {
      setWait(true);
      let data = { email: email.email }
      setWait(true);
      Axios.post(NEWAPI + '/api/user/resetLink', data, config)
        .then(res => {
          // resetLink emails a single-use link carrying the real userId + token. The old
          // in-app redirect to /reset-password/<id>/none was broken: resetLink returns the
          // string "OK", so res.data.id was undefined and the token was hard-coded "none",
          // which always failed token validation. We can't fix it by putting the token in
          // the response body without letting anyone mint a reset token with no inbox
          // access — so the member uses the emailed link instead.
          setFail({ isFaield: true, message: 'Check your email for a link to reset your password.', variation: 'success' });
          setTimeout(() => {
            setFail({ isFaield: false, message: '', variation: 'success' });
            setWait(false);
          }, 4000);
        }).catch(err => {
          // resetLink returns 400 with this body when the email has no Neon account.
          // That is a "we don't recognise this address" case, NOT a send failure — the
          // old generic "Failed to Send" message made a simple typo look like an outage.
          const status = err?.response?.status;
          const body = typeof err?.response?.data === 'string' ? err.response.data : '';
          const notFound = status === 400 && /not present in the neon DB/i.test(body);
          const message = notFound
            ? "We couldn't find an account with that email. Please check the spelling and try again."
            : 'Failed to Send. Please contact us at admin@gymnasticbodies.com to reset your password.';
          setFail({ isFaield: true, message, variation: 'error' })
          // A real fault (network/SendGrid) is still worth capturing; an unknown email is not.
          if (!notFound) Sentry.captureException(err);
          setTimeout(() => {
            setFail({ isFaield: false, message: '', variation: 'error' })
            setWait(false);
          }, 4000);
          /*console.error('EmailForm failure')
          setFail({ isFaield: true, message: 'Failed to Send Email. Please Try Again.', variation: 'error' })//new user alert!
          Sentry.captureException(err);
          setTimeout(() => {
            setFail({ isFaield: false, message: '', variation: 'error' })
            setWait(false);
          }, 2500);*/
        });
      /*axios.get(`${API}/password/lost-password-mail?email=${email.email}`)
        .then(res => {
          setFail({ isFaield: true, message: 'Email Sent. Please Check your Email.', variation: 'success' });
          setTimeout(() => {
            setFail({ isFaield: false, message: '', variation: 'success' });
            setWait(false);
          }, 2500);
        })
        .catch(err => {
          let data = { email: email.email }
          setWait(true);
          Axios.post(NEWAPI + '/api/user', data, config)
            .then(res => {
              setFail({ isFaield: true, message: 'Email Sent. Please Check your Email.', variation: 'success' });
              setTimeout(() => {
                setFail({ isFaield: false, message: '', variation: 'success' });
                setWait(false);
              }, 2500);
            }).catch(error => {
              console.error('EmailForm failure')
              setFail({ isFaield: true, message: 'Failed to Send Email. Please Try Again.', variation: 'error' })//new user alert!
              Sentry.captureException(err);
              setTimeout(() => {
                setFail({ isFaield: false, message: '', variation: 'error' })
                setWait(false);
              }, 2500);
            });

        })*/
    }

    else {
      setFail({ isFaield: true, message: 'Please enter an Email.', variation: 'error' });
      setTimeout(() => setFail({ isFaield: false, message: '', variation: 'error' }), 2500);
    }
  }

  if (!wait) {
    form = (
      <Aux>
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
          onChange={(event) => handleChange(event)}
          error={!email.valid}
          helperText={email.valid ? '' : 'Please Enter a Valid Email'}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(event) => handleClick(event)}
          disabled={!email.valid || wait}
        >
          {/* Send Password Reset Email */}
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
    )
  }
  else {
    form = (<CircularProgress style={{ margin: 'auto', marginTop: '36px' }} />)
  }

  return (
    <form className={classes.form} noValidate>
      <Box mt={2}>
        <Box mb={1}>
          <Typography variant="h6" align="center">
            Forgot your Password?
          </Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box mt={1}>
          <Typography variant="body1" align="center">
            {/* No worries, enter your email and we'll send you a link to reset your password. */}
            No worries, enter your email.
          </Typography>
        </Box>
      </Box>
      {form}
      <SnackBar open={fail.isFaield} message={fail.message} variation={fail.variation} />
    </form>
  );
};

export default EmailForm;
