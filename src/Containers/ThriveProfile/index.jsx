import React, {useState, useEffect} from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data'
import * as Sentry from "@sentry/react";

import ImageUpload from '../../Components/UtilComponents/ImageUpload';
import GridContainer from '../../Components/UtilComponents/Mui-GridContainer'
import Container from '../../Components/UtilComponents/Container'
import { showToast } from '../../Store/Action/calendarActions'

const useStyles = makeStyles(theme=>({
  background: { background: '#eeeeee', marginBottom: 12 },
  image: {
    width: '128px',
    verticalAlign: 'middle'
  },
  title: {
    marginTop: 0,
    marginBottom: '12px',
    fontSize: '40px',
    fontWeight: 400,
    [theme.breakpoints.down(415)]: {
      fontSize: '28px',
    },
    [theme.breakpoints.up(766)]: {
      fontSize: '32px',
    },
    [theme.breakpoints.up(1024)]: {
      fontSize: '40px',
    }
  },
  subHeading: {
    margin: '0 auto',
    width: '75%',
    [theme.breakpoints.down(415)]: {
      width: '100%',
    },
  },
  parts: {
    background: '#eeeeee',
    borderTop: '1px solid #dddddd',
    borderBottom: '1px solid #dddddd',
    padding: '10px 20px',
    width: '100%',
    lineHeight: 1
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
    margin: 10,
  },
  span: {
    textDecoration: 'line-through',
    color: '#aaaaaa'
  },
  gridRoot: {
    display: 'flex',
    justifyContent: 'center'
  },
  before: {
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  after: {
    padding: '8px 16px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#1e88e5',
  },
}))

const API = process.env.REACT_APP_API;

const ThriveProfile = props => {
  const isThriveUser = useSelector(state => state.login.isThriveUser);
  const firstName = useSelector(state => state.login.firstName);
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.UserId);
  const [heightType, setHeightType] = useState(0)
  const [weightType, setWeightType] = useState(0)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [inches, setInches] = useState('')
  const [beforePhoto, setBeforePhoto] = useState('');
  const [beforePhotoObj, setBeforePhotoObj] = useState('');
  const [afterPhoto, setAfterPhoto] = useState('');
  const [afterPhotoObj, setAfterPhotoObj] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch()

  const classes = useStyles();
  const gfImage = 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/GF-orangelogo.svg';

  const onChange = (e, type) => {
    const re = /^[0-9\d]+$/;

    if ((e.target.value !== '' || re.test(e.target.value)) && type === 'Feet' && e.target.value <= 7) {
      setHeight(e.target.value)
    }
    if ((e.target.value !== '' || re.test(e.target.value)) && type === 'Inches' && e.target.value <= 11) {
      setInches(e.target.value)
    }
    if ((e.target.value !== '' || re.test(e.target.value)) && type === 'Meters' && e.target.value <= 2) {
      setHeight(e.target.value)
    }
    if ((e.target.value !== '' || re.test(e.target.value)) && type === 'Centimeters' && e.target.value <= 99) {
      setInches(e.target.value)
    }
    if (e.target.value === '' && (type === 'Feet' || type === 'Meters' )) {
      setHeight('')
    }
    if (e.target.value === '' && (type === 'Inches' || type === 'Centimeters' )) {
      setInches('')
    }
  }

  const handleFeetChange = (e) => {
    if (e.target.value === 0 && (height || inches)) {
      let tempHeight = height === '' ? 0 : parseInt(height);
      let tempInch = inches === '' ? 0 : parseInt(inches);

      let cm = (tempHeight * 100) + tempInch;
      let newInch = (cm*0.393700787).toFixed(0);
      let feet = Math.floor(newInch / 12);

      newInch %= 12;

      setHeight(feet);
      setInches(newInch);
    }
    else if (e.target.value === 1 && (height || inches)) {
      let meters = (height * 0.3048) + (inches * 0.0254);
      let centimeter;

      meters = Math.abs(meters);
      meters = meters.toFixed(2);

      centimeter = meters - Math.floor(meters)
      centimeter *= 100;

      centimeter = ~~centimeter;
      meters = ~~meters;

      setHeight(meters)
      setInches(centimeter)
    }
    setHeightType(e.target.value);
  }

  const handleWeightChanges = (e) => {
    let convertedWeight;
    if (e.target.value === 0 && weight) {
      convertedWeight = weight * 2.205;
      convertedWeight = Math.round(convertedWeight)
      setWeight(convertedWeight)
    }
    else if (e.target.value === 1 && weight) {
      convertedWeight = weight / 2.205;
      convertedWeight = Math.round(convertedWeight)
      setWeight(convertedWeight)
    }
    setWeightType(e.target.value);
  }

  const handleImperialMetric = e => {
    handleWeightChanges(e);
    handleFeetChange(e)
  }

  useEffect(() => {
    const getUserData = () => {
      var config = {
        method: 'get',
        url: `${API}/thrive/profile/users/${userId}`,
        headers: {
          'Authorization': `Bearer ${webToken}`
        }
      };
      axios(config).then(res => {
        let userData = res.data;
        storeData(userData)
      }).catch(err => Sentry.captureException(err))
    }
    if (isThriveUser) {
      getUserData();
    }

    // imperial-0 is (feet,inches,lbs) metric-1 is (m,cm,kg)

  }, [webToken, userId, isThriveUser]);

  const handleSaveData = () => {
    let formData = new FormData();
    setIsUploading(true);

    if (beforePhotoObj) {
      formData.append('beforeImg', beforePhotoObj, beforePhotoObj.name)
    }
    else {
      formData.append('beforeImg', '')
    }

    if (afterPhotoObj) {
      formData.append('currentImg', afterPhotoObj, afterPhotoObj.name)
    }
    else {
      formData.append('currentImg', '')
    }

    formData.append('myProfileRequest', JSON.stringify({ units: heightType, height1: height, height2: inches, weight: ~~weight }));

    var config = {
      method: 'post',
      url: `${API}/thrive/profile/users/${userId}`,
      headers: {
        'Authorization': `Bearer ${webToken}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData
    };



    axios(config)
      .then(res => {
        dispatch(showToast('Successful Saved Your Profile.', 'success'))
        setIsUploading(false)
      })
      .catch(err => {
        dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'))
        setIsUploading(false)
        Sentry.captureException(err);
      })
  }

  const storeData = userData => {
    if (userData.units !== null) {
      setHeight(userData.height1);
      setInches(userData.height2);
    }

    if (userData.beforeImg && userData.beforeImg !== null) {
      setBeforePhoto(userData.beforeImg);
    }

    if (userData.currentImg && userData.currentImg !== null) {
      setAfterPhoto(userData.currentImg);
    }

    if (userData.units !== null) {
      setHeightType(userData.units);
      setWeightType(userData.units);
      setWeight(userData.weight);
    }
  }

  const thriveProfileComp = (
    <Container addedClasses={classes.background}>
      <GridContainer elevation={2} addbackground={true} center={true}>
        <Box m={1} style={{ width: '100%' }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center' }} >
            <img className={classes.image} src={gfImage} alt="GymFit Logo" />
            <Typography variant='h3' className={classes.title}>{firstName ? `${firstName}'s` : 'Your' } Profile</Typography>
            <Typography variant='body1' className={classes.subHeading}>Fill out your height and weight, and upload a “before” photo.</Typography>
            <Typography variant='body1' className={classes.subHeading}>This first step unlocks your Thrive tasks.</Typography>
          </Grid>
        </Box>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridRoot}>
          <Box m={1}>
            <Button variant="contained" color="primary" style={{ letterSpacing: '0.65px'}} onClick={handleSaveData}>
              Save Changes
            </Button>
          </Box>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" justifyContent='center' style={{margin: 4}}>
          <Grid item>
            <Typography variant='h5'>Your Height: </Typography>
          </Grid>
          <Grid item xs={4} sm={2} md={1} lg={1}>
            <TextField type="number" style={{width: '100%'}} inputProps={{ min: 0, max: heightType === 0 ? 7 : 3 }} id="input-with-icon-grid" label={heightType === 0 ? 'Feet' : 'Meters'} value={height} onChange={heightType === 0 ? (e) => onChange(e, 'Feet')  : (e) => onChange(e, 'Meters')} />
          </Grid>
          {
            heightType === 0
              ? <Grid item xs={2} sm={2} md={1} lg={1}>
                  <TextField type="number" style={{width: '100%'}} inputProps={{ min: 0, max: 11 }} id="input-with-icon-grid" label="Inches" value={inches} onChange={(e) => onChange(e, 'Inches')} />
                </Grid>
              : <Grid item xs={2} sm={2} md={1} lg={1}>
                <TextField type="number" style={{ width: '100%' }} inputProps={{ min: 0, max: 99 }} id="input-with-icon-grid" label="Centimeter" value={inches} onChange={(e) => onChange(e, 'Centimeters')} />
              </Grid>
          }
          <Grid item>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={heightType}
                onChange={handleImperialMetric}
              >
                <MenuItem value={0}>FT</MenuItem>
                <MenuItem value={1}>M</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" justifyContent='center' style={{margin: 4}}>
          <Grid item>
            <Typography variant='h5'>Your Weight: </Typography>
          </Grid>
          <Grid item>
            <TextField type="number" id="input-with-icon-grid" inputProps={{ step: '.01' }} label="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={weightType}
                onChange={handleImperialMetric}
              >
                <MenuItem value={0}>LB</MenuItem>
                <MenuItem value={1}>KG</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container style={{ padding: 8 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin: 'auto', textAlign: 'center', paddingBottom: 8, paddingTop: 18 }} >
            <Typography variant='body1' className={classes.subHeading}>Change your “after” photo every few weeks so you can see your progress!</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className={classes.before}>
            <ImageUpload title='Before' img={beforePhoto} setObj={setBeforePhotoObj} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className={classes.after}>
            <ImageUpload title='After' img={afterPhoto} setObj={setAfterPhotoObj}/>
          </Grid>
        </Grid>
        <Backdrop className={classes.backdrop} open={isUploading}>
          <CircularProgress size={60} />
        </Backdrop>
      </GridContainer>
    </Container>
  )

  return  isThriveUser ? thriveProfileComp : <Redirect to="/" />

}


export default ThriveProfile;
