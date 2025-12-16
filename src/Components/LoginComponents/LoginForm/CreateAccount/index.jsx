import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useDispatch } from "react-redux";
import * as Sentry from "@sentry/react";

import Copyright from "../Copyright";
import SnackBar from '../../../SnakBar'
import Aux from "../../../../HOC/aux"


import { Login } from '../../../../Store/Action';

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

const CreateAccount = () => {
  const classes = useStyles();
  const [email, setEmail] = useState({ email: '', valid: true });
  const [fail, setFail] = useState({ isFailed: false, message: '', variation: 'error' });
  const [wait, setWait] = useState(false);
  let form;
  const LinkRef = React.forwardRef((props, ref) => <div style={{ display: 'contents' }} ref={ref}><NavLink {...props} /></div>);
  const API = process.env.REACT_APP_API;

  const [PassWordOne, setPassWordOne] = useState('');
  const [PassWordTwo, setPassWordTwo] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail({email: e.target.value, valid: pattern.test( e.target.value )});
  }

  const handleClick = (e) => {
    e.preventDefault();

    if (email.email !== '') {
      setWait(true);
      axios.post(`${API}/login/freemember/signup?emailId=${email.email}&password=${PassWordOne}`)
        .then(res => {
          if (res.data.message === "Account already exists.") {
            setFail({ isFailed: true, message: 'Looks like you already have an account. Please Login!', variation: 'error' });
            setWait(false);
            setPassWordOne('');
            setPassWordTwo('');
            setTimeout(() => {
              setFail({ ...fail , isFailed: false });
            }, 2500);
          }
          else {
            dispatch(Login(res.data.EmailId, PassWordOne));
          }
      })
      .catch(err => {
        setFail({ isFailed: true, message: 'Failed to create account. Please Try Again.', variation: 'error' })
        Sentry.captureException(err);
        setPassWordOne('');
        setPassWordTwo('');
        setTimeout(() => {
          setFail({ isFailed: false, message: '', variation: 'error' })
          setWait(false);
        }, 2500);
      })
    }

    else {
      setFail({ isFailed: true, message: 'Please enter an Email.', variation: 'error' });
      setTimeout(() => setFail({isFailed: false, message: '', variation:'error'}), 2500);
    }
  }

  const handlePasswordOne = (e) => {
    if ( e.target.value.match(/^[a-zA-Z0-9!$#]*$/i) && e.target.value.length <= 20 ) {
      setPassWordOne(e.target.value);
    }
  }
  const handlePasswordTwo = (e) => {
    if ( e.target.value.match(/^[a-zA-Z0-9!$#]*$/i) && e.target.value.length <= 20 ) {
      setPassWordTwo(e.target.value);
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
        <TextField
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth
          name="new-password"
          label="Your Password"
          type="password"
          id="new-password"
          autoComplete="new-password"
          onChange={(event) => handlePasswordOne(event)}
          value={PassWordOne}
          error={PassWordOne.length < 6 && PassWordOne.length ? true : false}
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
          error={PassWordOne !== PassWordTwo || (PassWordTwo.length < 6 && PassWordTwo.length) ? true : false}
          helperText={PassWordOne !== PassWordTwo ? 'Password Does Not Match' : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(event) => handleClick(event)}
          disabled={!email.valid || wait || PassWordOne !== PassWordTwo || PassWordOne.length < 6 || PassWordTwo.length < 6}
        >
          Create Your Free Account!
        </Button>
        <Grid container>
          <Grid item xs style={{ textAlign: "left" }}>
            <Link component={LinkRef} to="/" exact variant="body1">
              Alredy have an account? Return To Login
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
    form = (<CircularProgress style={{margin: 'auto', marginTop: '36px'}}/>)
  }

  return (
    <form className={classes.form} noValidate>
      <Box mt={2}>
        <Box mb={1}>
          <Typography variant="h6" align="center">
            Create Your Free Member Account!
          </Typography>
        </Box>
        <Divider className={classes.divider}/>
        <Box mt={1}>
          <Typography variant="body1" align="center">
            Thank you for your interest in GymFit and trying out our free member account! We are excited to have you as a member. Please enter the same email address you used to register with us.
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant="body1" align="center">
            Min of 6 and Max to 20 charactars, A-Z, a-z, 0-9 and allowed special charactars are: !$#
          </Typography>
        </Box>
      </Box>
      {form}
      <SnackBar open={fail.isFailed} message={fail.message} variation={fail.variation}/>
    </form>
  );
};

export default CreateAccount;
