import React, { useState } from 'react';
import {
  makeStyles,
  Typography,
  Card,
} from '@material-ui/core';
import clsx from 'clsx';

import ButtonGroup from '../../../SamplerCard/CustomButtonGroup'

const useStyles = makeStyles(theme => ({
  verticalText: {
    writingMode: 'vertical-rl',
    textOrientation: 'upright',
    letterSpacing: -4,
    textTransform: 'uppercase',
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    padding: '8px 0',
    color: ' #FF9435'
  },
  card: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    borderRadius: 0,
    background: 'transparent',
    marginTop: 4,
    marginBottom: 4
  },
  mobile: {
    flexDirection: 'row',
  },
  text: {
    writingMode: 'inherit',
    letterSpacing: 0,
  }
}));

const Rounds = (props) => {
  const classes = useStyles();
  // state
  const [rounds, setRounds] = useState(1)

  return (
    <Card className={clsx(classes.card, {[classes.mobile] : props.isMobileMode})} elevation={0}>
      <ButtonGroup min={1} max={5} isRounds={true} current={rounds} largeText={true} handleRounds={setRounds} notRedux isMobileMode={props.isMobileMode}/>
      <Typography className={clsx(classes.verticalText, {[classes.text] : props.isMobileMode})} variant='h6' >
        Rounds
      </Typography>
    </Card>
  )
}

export default Rounds;
