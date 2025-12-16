import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles, Grid, Box, Link} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import * as Sentry from "@sentry/react";
import { AxiosConfig } from '../../../Store/util';
import clsx from 'clsx'

import PathSelection from '../InitialPage/PathSelection'
import { setLevelPath, continutePreviosLevel } from '../../../Store/Action/LevelsActions';
import { openOhNo } from '../../../Store/Reducers/OhNoReducer';

import { LinkRef } from '../../UtilComponents/LinkOverride';

const useStyles = makeStyles(theme => ({
  title: {
    color: "#656464",
    padding: "24px 0 0",
  },
  button: {
    backgroundColor: "#91EEFF !important",
    color: '#656464',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    border: '#707070 solid 1px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    }
  },
  cancel: {
    backgroundColor: 'white',
    padding: '4px 30px',
    fontSize: '18px',
    margin: '12px 32px',
    [theme.breakpoints.up(425)]: {
      margin: '12px 18px',
    },
    color: '#656464',
    border: '#707070 solid 1px',
  },
  root: {
    padding: 24
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: 4,
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    padding: 4,
    [theme.breakpoints.down(426)]: {
      flexDirection: 'column'
    }
  }
}));


function between(x, min, max) {
  return x >= min && x <= max;
}

const Seelctions = [
  {
    selctionTitle: 'Beginner Plan',
    description: 'AutoPilot gives you a quick, randomized workout.',
    image: 'Initial-Beginner.png',
    disabledImage: 'beg-disabled.svg',
  },
  {
    selctionTitle: 'Intermediate One',
    description: 'Guided Plans gives you a pre-built workout from beginner to advanced.',
    image: 'Initial-Intermediate1.png',
    disabledImage: 'Int-1-disabled.svg',
  },
  {
    selctionTitle: 'Intermediate Two',
    description: 'Create your own workouts using our exercise library and follow alongs.',
    image: 'Initial-Intermediate2.png',
    disabledImage: 'Int-2-disabled.svg',
  },
  {
    selctionTitle: 'Advanced One',
    description: 'Take our quiz to know which guided plan to use.',
    image: 'Initial-Advanced1.png',
    disabledImage: 'Adv-1-disabled.svg',
  },
  {
    selctionTitle: 'Advanced Two',
    description: 'Take our quiz to know which guided plan to use.',
    image: 'Initial-Advanced2.png',
    disabledImage: 'Adv-2-disabled.svg',
  },
]


export default function GuidedPlans(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [lastLoginLevel, setLastLoginLevel] = useState(0);

  const levelId = useSelector(state => state.login.levelId);
  const webToken = useSelector(state => state.login.webToken);
  const userId = useSelector(state => state.login.UserId);
  const guidedPlanAccessLevels = useSelector(state => state.login.guidedPlanAccessLevels);


  const { handleClose, title, fullWidth, isInDrawer, open } = props;

  const [selectedPath, setSelectedPath] = useState(levelId > -1 && between(levelId, 0,4) ? levelId : -1);

  const location = useLocation();
  const history = useHistory();

  const handleChoosePath = () => {
    if (selectedPath > -1 && isAccessible(selectedPath)) {
      if (selectedPath === lastLoginLevel && isInDrawer && selectedPath !== 0) {
        dispatch(continutePreviosLevel(lastLoginLevel));
      }
      else {
        dispatch(setLevelPath(selectedPath))
      }

      if (isInDrawer) {
        handleClose();
      }

      if (location.pathname !== '/') {
        history.push("/")
      }
    }
    else {
      // TODO: Toast message
      dispatch(openOhNo());
    }
  }

  useEffect(() => {
    if (isInDrawer && open && levelId !== 0  ) {
      axios(AxiosConfig('get', `/myschedule/levels/lastViewed/users/${userId}`, webToken)).then(res => {
        if (res.data.lastLoginLevel > 0 ) {
          setLastLoginLevel(res.data.lastLoginLevel)
          setSelectedPath(res.data.lastLoginLevel)
        }
      }).catch(error => {
        Sentry.captureException(error);
      });
    }
  }, [isInDrawer, webToken, userId, open, levelId])

  // check if index is in guidedPlanAccessLevels
  const isAccessible = (index) => {
    if (guidedPlanAccessLevels.length > 0) {
      return guidedPlanAccessLevels.indexOf(index) >= 0;
    }
    return false;
  }

  const handleSelection = (index) => {
    if (isAccessible(index)) {
      setSelectedPath(index)
    }
    else {
      dispatch(openOhNo());
    }
  }



  return (
    <Box m={1}>
      <Box mb={4} style={{ width: '100%' }}>
        <Typography variant='h4' gutterBottom className={classes.title} id="responsive-dialog-title" align='center'>
          {
            title ? title : 'Do you want to switch to a guided plan?'
          }
        </Typography>
      </Box>
      <Box mt={3} style={{ width: '100%' }}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={ fullWidth ? 12 : 8} md={fullWidth ? 12 :7} lg={fullWidth ? 12 :9}>
            <Grid container justifyContent='center'>
              {
                Seelctions.map((selection, index) => {
                  return (
                    <Grid item key={index} xs={index === 0 ? 12 : 6} sm={ index === 0 ? 12 : 6} md={index === 0 ? 12 : isInDrawer ? 3 : 6} lg={index === 0 ? 12 : isInDrawer ? 3 : 6} className={classes.gridItem} style={selection.style}>
                      <PathSelection
                        highlightColor='grey'
                        onClick={() => handleSelection(index)}
                        key={index}
                        isSelected={
                          index === selectedPath || (lastLoginLevel === index && index === selectedPath && isInDrawer)
                            ? true
                            : false
                        }
                        {...selection}
                        image={!isAccessible(index) ? selection.disabledImage : selection.image}
                      />
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.buttonDiv}>
            <Button size='large' onClick={handleClose} color="primary" autoFocus className={classes.cancel}>
              Cancel
            </Button>
            <Button size='large' onClick={handleChoosePath} color="primary" autoFocus className={clsx({[classes.button]: selectedPath !== -1, [classes.cancel] : selectedPath === -1 })} disabled={ selectedPath === -1 }>
              {
                 isInDrawer && lastLoginLevel === selectedPath ? 'Continue Plan' : 'Select Plan'

              }
            </Button>
          </Grid>
          {
            isInDrawer ?
              <>
                {
                  lastLoginLevel !== selectedPath && selectedPath !== 0 ? <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Typography variant='subtitle1' style={{ color: 'red' }} align='center' > * Note: Selecting this level will replace your currently saved schedule. </Typography>
                  </Grid>
                    : null
                }
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.buttonDiv}>
                  <Link variant="h6" to="/learn-more/guided-plans" component={LinkRef} onClick={handleClose} align='center' > Learn How to use Guided Plans </Link>
                </Grid>
              </>
              : null
          }
        </Grid>
      </Box>
    </Box>
  );
}
