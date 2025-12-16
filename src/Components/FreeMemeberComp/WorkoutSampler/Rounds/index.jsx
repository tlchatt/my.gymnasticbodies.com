import React from 'react';
import {
  makeStyles,
  Typography,
  Card,
  IconButton
} from '@material-ui/core';
import clsx from 'clsx';

import SettingsIcon from '@material-ui/icons/Settings';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useDispatch } from 'react-redux';

import ButtonGroup from '../../SamplerCard/CustomButtonGroup'

import { resetAllProg } from '../../../../Store/Action/FreeMemberActions'


const useStyles = makeStyles(theme => ({
  verticalText: {
    writingMode: 'vertical-rl',
    textOrientation: 'upright',
    letterSpacing: -4,
    textTransform: 'uppercase',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    padding: '8px 0',
    color: ' #FF9435',
    fontWeight: 500
  },
  rounds: {
    padding: 8,
    paddingLeft: 0
  },
  card: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: 50,
    justifyContent: 'center'
  },
  isBYO: {
    color: '#656464'
  },
  padding: {
    padding: '8px 0'
  }
}));

const Rounds = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    openEditModal,
    rounds,
    dateKey,
    dateKeyIndex,
    isLogged,
    checkForFirstLogged,
    hideSettings,
    hideRefresh,
    isBuildYourOwn,
    isWorkoutAccessable
  } = props;

  const resetAll = () => {
    dispatch(resetAllProg(dateKeyIndex, dateKey));
  }

  return (
    <div className={clsx(classes.rounds, {[classes.padding] : isBuildYourOwn})}>
      <Card className={classes.card} square elevation={3}>
        {
          hideRefresh
            ? null
            : <IconButton style={{ padding: 8, marginTop: 4 }} onClick={resetAll} disabled={isLogged} >
              <AutorenewIcon style={{ fontSize: 28 }} />
            </IconButton>
        }
        {
          hideSettings
            ? null
            : <IconButton color="primary" aria-label="upload picture" component="span" onClick={openEditModal} disabled={isLogged} >
              <SettingsIcon style={{ fontSize: 28 }} />
            </IconButton>
        }
        <ButtonGroup isBuildYourOwn={isBuildYourOwn} min={1} max={5} isRounds={true} current={rounds} largeText={true} dateKey={dateKey} disabled={isLogged || checkForFirstLogged || isWorkoutAccessable} />
        <Typography className={clsx(classes.verticalText, {[classes.isBYO] : isBuildYourOwn})} variant='h6' >
          Rounds
        </Typography>
      </Card>
    </div>
  )
}

export default Rounds;
