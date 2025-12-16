import React, { useEffect, useState, memo } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import { useSelector } from 'react-redux'
import axios from 'axios';
import * as Sentry from "@sentry/react";

import ImageUpload from './ImageUpload';


const useStyles = makeStyles(theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8'
  },
  root: {
    display: 'flex',
    background: '#DEDEDE',
    position: 'relative',
    minHeight: 1
  },
  title: {
    background: '#DEDEDE',
    position: 'absolute',
    right: '10%',
    top: -4,
    '&::before': {
      borderRight: "none",
      transform: "skew(28deg)",
      transformOrigin: "top left",
      position: "absolute",
      content: '""',
      top: "0px",
      left: '-30px',
      height: "100%",
      background: "#DEDEDE",
      border: "2px solid #DEDEDE",
      borderLeftWidth: "3px",
      zIndex: -1,
      width: "100%",
    },
    '&::after': {
      top: "0px",
      right: "-30px",
      width: "100%",
      border: "2px solid #DEDEDE",
      height: "100%",
      content: '""',
      zIndex: -1,
      position: "absolute",
      transform: "skew(-28deg)",
      background: "#DEDEDE",
      borderLeft: "none",
      transformOrigin: "top left",
      borderRightWidth: "3px"
    }
  },
  before: {
    padding: 8,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  after: {
    padding: 8,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  gridRoot: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    background: "linear-gradient(18deg, #FF9435 0%, #f05621 100%)",
    color: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
}))

const API = process.env.REACT_APP_API;

const ThriveTasks = props => {
  const isThriveUser = useSelector(state => state.login.isThriveUser);
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.UserId);
  // const dispatch = useDispatch();
  // const [missedDays, setMissedDays] = useState(false);

  const classes = useStyles();

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
    if (e.target.value === '' && (type === 'Feet' || type === 'Meters')) {
      setHeight('')
    }
    if (e.target.value === '' && (type === 'Inches' || type === 'Centimeters')) {
      setInches('')
    }
  }

  const handleFeetChange = (e) => {
    if (e.target.value === 0 && (height || inches)) {
      let tempHeight = height === '' ? 0 : parseInt(height);
      let tempInch = inches === '' ? 0 : parseInt(inches);

      let cm = (tempHeight * 100) + tempInch;
      let newInch = (cm * 0.393700787).toFixed(0);
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
        // dispatch(showToast('Successful Saved Your Profile.', 'success'))
        props.showToast('Successful Saved Your Profile.');
        setIsUploading(false)
      })
      .catch(err => {
        // dispatch(showToast('Something went wrong. No worried we\'ve been notified!', 'error'))
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


  const thriveTasksComp = (
    <>
      <Grid container alignItems="center"  style={{ background: '#DEDEDE', padding: 8 }} >
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Grid container alignItems="flex-end"  justifyContent='center'  style={{ padding: 4 }}>
            <Grid xs={12} sm={3} md={5} lg={4} item style={{ padding: 4 }}>
              <Typography variant='h5' align='center'>Your Height:</Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={3} lg={12 / 4} style={{ padding: 4 }}>
              <TextField type="number" style={{ width: '100%' }} inputProps={{ min: 0, max: heightType === 0 ? 7 : 3 }} id="input-with-icon-grid" label={heightType === 0 ? 'Feet' : 'Meters'} value={height} onChange={heightType === 0 ? (e) => onChange(e, 'Feet') : (e) => onChange(e, 'Meters')} />
            </Grid>
            {
              heightType === 0
                ? <Grid item xs={4} sm={3} md={2} lg={12 / 4} style={{ padding: 4 }}>
                  <TextField type="number" style={{ width: '100%' }} inputProps={{ min: 0, max: 11 }} id="input-with-icon-grid" label="Inches" value={inches} onChange={(e) => onChange(e, 'Inches')} />
                </Grid>
                : <Grid item xs={4} sm={3} md={2} lg={12 / 4} style={{ padding: 4 }}>
                  <TextField type="number" style={{ width: '100%' }} inputProps={{ min: 0, max: 99 }} id="input-with-icon-grid" label="Centimeter" value={inches} onChange={(e) => onChange(e, 'Centimeters')} />
                </Grid>
            }
            <Grid item style={{ padding: 4 }}>
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
          <Grid container alignItems="flex-end" justifyContent='center' style={{ padding: 4 }}>
            <Grid xs={12} sm={3} md={5} lg={4} item style={{ padding: 4 }}>
              <Typography variant='h5' align='center'>Your Weight:</Typography>
            </Grid>
            <Grid item sm={5} md={5} lg={6} style={{ padding: 4 }}>
              <TextField type="number" id="input-with-icon-grid" style={{ width: '100%' }} inputProps={{ step: '.01' }} label="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </Grid>
            <Grid item style={{ padding: 4 }}>
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
          <Grid item xs={12} sm={12} md={12} lg={12} style={{ padding: 4 }}>
            <Typography align='center'>
              Once you upload a “before” photo, you can start the Thrive curriculum.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridRoot}>
            <Box m={1}>
              <Button disabled={isUploading} color="primary" className={classes.button} onClick={handleSaveData}>
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <Grid container style={{ padding: 8 }}>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.before}>
              <ImageUpload title='Before' img={beforePhoto} setObj={setBeforePhotoObj} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.after}>
              <ImageUpload title='After' img={afterPhoto} setObj={setAfterPhotoObj} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box className={classes.root}>
        <Typography className={classes.title} variant='h4' style={{ color: '#656464' }}>
          Profile
        </Typography>
      </Box>
    </>
  )

  return thriveTasksComp

}


export default memo(ThriveTasks);
