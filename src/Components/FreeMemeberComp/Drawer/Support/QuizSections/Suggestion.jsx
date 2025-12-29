import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles, Grid, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { suggestedSecondary } from './secondaryText'

import { setLevelPath } from '../../../../Store/Action/LevelsActions';
import { openOhNo } from '../../../../Store/Reducers/OhNoReducer'

const useStyles = makeStyles(theme => ({
  title: {
    color: "#FF9435",
  },
  root: {
    padding: 24
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
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
}));

const suggestedLevels = {
  Beginner: {
    name: 'Beginner Level',
    lowerText: 'Now is the time to address your fitness deficits. Build strength in your joints, renew your flexibility, and utilize active mobility to build full ranges of motion. It might feel like you’re slowing down at first, but you are establishing fundamentals that will propel you farther, faster later—and protect you from injury.',
    buttonText: 'Start The Beginner Plan',
    index: 1
  },
  IntermediateOne: {
    name: 'Intermediate One',
    lowerText: 'Intermediate One combines warm-ups, active mobility, injury prevention, and our Foundation One course. You will be challenged by exclusive core exercises, active mobility, and unique bodyweight strength-building. Expect to work in this level for three to twelve months, depending on your consistency and other factors.',
    buttonText: 'Start Intermediate One',
    index: 2
  },
  IntermediateTwo: {
    name: 'Intermediate Two',
    lowerText: 'Intermediate Two combines warm-ups, active mobility, injury prevention, and our Foundation Two course. You will be challenged by the strength programming in this level and should experience further mobility improvements. Expect to work in this level for three to twelve months, depending on your consistency and other factors.',
    buttonText: 'Start Intermediate Two',
    index: 3
  },
  AdvancedOne: {
    name: 'Advanced One',
    lowerText: 'The Advanced levels will bring you face to face with your active mobility needs. Even though you’re strong, your strength will be challenged at more extreme angles. You’ll find yourself doing work that normal gym rats couldn’t dream of. It’s exciting and you’ll be happy you stuck with it this far!',
    buttonText: 'Start Advanced One',
    index: 4
  },
  AdvancedTwo: {
    name: 'Advanced Two',
    lowerText: 'The Advanced levels will bring you face to face with your active mobility needs. Even though you’re strong, your strength will be challenged at more extreme angles. You’ll find yourself doing work that normal gym rats couldn’t dream of. It’s exciting and you’ll be happy you stuck with it this far!',
    buttonText: 'Start Advanced Two',
    index: 5
  },
}


const Suggestion = (props) => {
  // Styles
  const classes = useStyles();
  // Props
  const { userInputs, lowestScore } = props;

  // State
  const [suggestedLevel, setSuggestedLevel] = useState(suggestedLevels.Beginner);
  const [sugMobility, setSugMobility] = useState('');
  const [sugCore, setSugCore] = useState('');
  const [sugStr, setStr] = useState('');

  // Redux
  const dispatch = useDispatch();
  const guidedPlanAccessLevels = useSelector(state => state.login.guidedPlanAccessLevels);

  // Useeffects
  useEffect(() => {
    let finalSum = 0;
    for (let key in userInputs) {
      finalSum += userInputs[key];
    }

    let lowestPossibleLevel = suggestedLevels.Beginner;
    let maxPossibleLevel;

    if (finalSum >= 7 && finalSum <= 10) maxPossibleLevel = suggestedLevels.Beginner;
    if (finalSum >= 11 && finalSum <= 17) maxPossibleLevel = suggestedLevels.IntermediateOne;
    if (finalSum >= 18 && finalSum <= 24) maxPossibleLevel = suggestedLevels.IntermediateTwo;
    if (finalSum >= 25 && finalSum <= 31) maxPossibleLevel = suggestedLevels.AdvancedOne;
    if (finalSum >= 32 && finalSum <= 35) maxPossibleLevel = suggestedLevels.AdvancedTwo;

    if (lowestScore === 1) lowestPossibleLevel = suggestedLevels.IntermediateOne;
    if (lowestScore === 2) lowestPossibleLevel = suggestedLevels.IntermediateTwo;
    if (lowestScore === 3) lowestPossibleLevel = suggestedLevels.AdvancedOne;
    if (lowestScore >= 4) lowestPossibleLevel = suggestedLevels.AdvancedTwo;

    let Strength;
    let Mobility;
    let Core;

    if (userInputs.Core <= 3) Core = 'Beginner';
    if (userInputs.Core > 3  && userInputs.Core <= 6) Core = 'IntermediateOne';
    if (userInputs.Core > 6  && userInputs.Core <= 9) Core = 'IntermediateTwo';
    if (userInputs.Core > 9  && userInputs.Core <= 12) Core = 'AdvancedOne';
    if (userInputs.Core > 12 ) Core = 'AdvancedTwo';

    if (userInputs.UpperBody <= 2) Strength = 'Beginner';
    if (userInputs.UpperBody > 2  && userInputs.UpperBody <= 4) Strength = 'IntermediateOne';
    if (userInputs.UpperBody > 4  && userInputs.UpperBody <= 6) Strength = 'IntermediateTwo';
    if (userInputs.UpperBody > 6  && userInputs.UpperBody <= 8) Strength = 'AdvancedOne';
    if (userInputs.UpperBody > 8 ) Strength = 'AdvancedTwo';

    if (userInputs.Mobility <= 2) Mobility = 'Beginner';
    if (userInputs.Mobility > 2  && userInputs.Mobility <= 4) Mobility = 'IntermediateOne';
    if (userInputs.Mobility > 4  && userInputs.Mobility <= 6) Mobility = 'IntermediateTwo';
    if (userInputs.Mobility > 6  && userInputs.Mobility <= 8) Mobility = 'AdvancedOne';
    if (userInputs.Mobility > 8) Mobility = 'AdvancedTwo';

    setSugMobility(Mobility)
    setSugCore(Core)
    setStr(Strength)

    if (maxPossibleLevel.index < lowestPossibleLevel.index) {
      setSuggestedLevel(maxPossibleLevel);
    }
    if (maxPossibleLevel.index > lowestPossibleLevel.index) {
      setSuggestedLevel(lowestPossibleLevel);
    }

    if (maxPossibleLevel.index === lowestPossibleLevel.index) {
      setSuggestedLevel(maxPossibleLevel);
    }

  }, [userInputs, lowestScore]);

  const location = useLocation();
  const history = useHistory();

  // Event Handlers
  const handleChooseLevel = () => {
    if (guidedPlanAccessLevels.length > 0 && guidedPlanAccessLevels.indexOf(suggestedLevel.index - 1) >= 0) {
      
      dispatch(setLevelPath(suggestedLevel.index - 1, props.handleClose))
      
      if (location.pathname !== '/') {
        
        history.push("/")
      }else{
        dispatch(props.handleClose)
      }
    }
    else {
      dispatch(openOhNo());
    }
  }

  return (
    <Box m={1} style={{ width: '100%' }}>
      <Box mb={1} mt={4} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography variant='body1' style={{ color: '#656464' }} id="responsive-dialog-title" align='center'>We recommend,</Typography>
      </Box>
      <Box mb={2} style={{ width: '100%' }}>
        <Typography variant='h4' className={classes.title} id="responsive-dialog-title" align='center'>{suggestedLevel.name}</Typography>
      </Box>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Typography variant='h6' style={{ color: '#656464', fontFamily: 'Helvetica Neue', textTransform: 'uppercase' }}>
            Strength
          </Typography>
          <Typography variant='body1' style={{ color: '#656464' }}>
          { suggestedSecondary.strength[sugStr] }
          </Typography>
          <Box mb={2} />
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Typography variant='h6' style={{ color: '#656464', fontFamily: 'Helvetica Neue', textTransform: 'uppercase' }}>
            Mobility
          </Typography>
          <Typography variant='body1' style={{ color: '#656464' }}>
            { suggestedSecondary.mobility[sugMobility] }
          </Typography>
          <Box mb={2} />
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Typography variant='h6' style={{ color: '#656464', fontFamily: 'Helvetica Neue', textTransform: 'uppercase' }}>
            Core
          </Typography>
          <Typography variant='body1' style={{ color: '#656464' }}>
          { suggestedSecondary.core[sugCore] }
          </Typography>
          <Box mb={2} />
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Typography variant='body1' style={{ color: '#656464' }}>
            {suggestedLevel.lowerText}
          </Typography>
          <Box mb={2} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
          <Button size='large' onClick={handleChooseLevel} autoFocus variant='contained' className={classes.button}>
            {suggestedLevel.buttonText}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Suggestion;
