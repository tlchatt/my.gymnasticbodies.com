import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import clsx from 'clsx';

import { getLevelPLan, ManageDificulty, ManageDificultyNew } from '../../../../Store/Action/LevelsActions.js'


const useStyles = makeStyles((theme) => ({
  disabled: {
    color: '#707070 !important',
    border: 'none !important',
    padding: '0 8px',
    fontFamily: 'Helvetica Neue',
  },
  button: {
    color: '#707070',
    border: 'none !important',
  },
  largeText: {
    fontSize: 24,
    lineHeight: 1.2,
    fontWeight: 700,
  },
  seconds: {
    lineHeight: 1
  },
  secondsText: {
    textTransform: 'lowercase'
  },
  increment: {
    color: '#43a047'
  },
  decrement: {
    color: '#f44336'
  }
}));

const Steps = (props) => {

  const { min, max } = props;
  const classes = useStyles();
  const dispatch = useDispatch();


  const {
    workoutIndex,//2
    dateKey,//MONDAY,DECEMBER 29
    dateKeyIndex,//0
    progressionIndex,//0
    exerciseId,//1
    step,//9
    disabled,//false
    isMobileView,//undefined
    section
  } = props;
  
  const [loading, SetLoading] = useState(false);
  const handleDifficulty = (type) => {
    SetLoading(true)
    console.log("inside handleDifficulty step",step)
    //Original: 
    dispatch(ManageDificulty(workoutIndex, dateKey, dateKeyIndex, exerciseId, type, section,step))
    //PC:
    dispatch(ManageDificultyNew(workoutIndex, dateKey, dateKeyIndex, exerciseId, type,section,step))
  }

  React.useEffect(() => {
    if (loading) {
      SetLoading(false)
    }
    // eslint-disable-next-line
  }, [props.step])
  return (
    <ButtonGroup
      // orientation="vertical"
      aria-label="vertical contained primary button group"
      variant="text"
    >
      <Button
        size="small"
        onClick={() => handleDifficulty('down')}
        className={clsx([classes.button, classes.decrement])}
        //disabled={props.disabled || step === min || loading || disabled }
        disabled={step === min}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        disabled
        component="span"
        classes={{
          disabled: clsx(classes.disabled)
        }}>
        {
          isMobileView ? `${step}/9` : `Step ${step} of 9`
        }
      </Button>
      <Button
        size="small"
        onClick={() => handleDifficulty('up')}
        className={clsx([classes.button, classes.increment])}
        // disabled={props.disabled || step === max || loading || disabled}
        disabled={step === max}
      >
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  );
}

// hello
export default Steps;
