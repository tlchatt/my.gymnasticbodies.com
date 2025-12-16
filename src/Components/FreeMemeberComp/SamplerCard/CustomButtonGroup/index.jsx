import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import clsx from 'clsx';

import { updateProgress, updateRounds } from "../../../../Store/Action/FreeMemberActions";
import { updateRepsSecs_BYO, updateRounds_BYO } from "../../../../Store/Action/WorkoutBuilderActions.js";

const useStyles = makeStyles((theme) => ({
  disabled: {
    color: '#707070 !important',
    border: 'none !important',
    padding: 0,
    fontFamily: 'Helvetica Neue',
  },
  button: {
    color: '#707070',
    border: 'none !important',
  },
  paddingTopZero: {
    paddingTop: 0
  },
  paddingBottomZero: {
    paddingBottom: 0
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
  }
}));

const GroupedButtons = (props) => {
  const { min, max, current, isRounds, dateKey, notRedux, handleRounds, isBuildYourOwn } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (max && current < max) {
      if (isBuildYourOwn) {
        dispatch(updateRepsSecs_BYO(dateKey, props.classOrProgOrExId, (current + (props.hasSec ? 5 : 1)) + `${props.hasSec ? 's' : 'r'}`));
      }
      else {
        dispatch(updateProgress((current + (props.hasSec ? 5 : 1)) + `${props.hasSec ? 's' : 'r'}`, props.autoPilotId, dateKey));
      }
    }
  };

  const handleDecrement = () => {
    if (min && current > min) {
      if (isBuildYourOwn) {
        dispatch(updateRepsSecs_BYO(dateKey, props.classOrProgOrExId, (current - (props.hasSec ? 5 : 1)) + `${props.hasSec ? 's' : 'r'}`));
      }
      else {
        dispatch(updateProgress((current - (props.hasSec ? 5 : 1)) + `${props.hasSec ? 's' : 'r'}`, props.autoPilotId, dateKey));
      }
    }
  };

  const handleRoundsInc = () => {
    if (max && current < max) {
      if (isBuildYourOwn) {
        dispatch(updateRounds_BYO(dateKey, current + 1 ));
      }
      else {
        notRedux ? handleRounds(current + 1) : dispatch(updateRounds(current + 1, dateKey));
      }
    }
  };

  const handleRoundsDec = () => {
    if (min && current > min) {
      if (isBuildYourOwn) {
        dispatch(updateRounds_BYO(dateKey, current - 1 ));
      }
      else {
        notRedux ? handleRounds(current - 1) : dispatch(updateRounds(current - 1, dateKey));
      }
    }
  };

  return (
    <ButtonGroup
      orientation={props.isMobileMode ? "horizontal" : "vertical"}
      aria-label="vertical contained primary button group"
      variant="text"
    >
      {
        props.isMobileMode
          ? <Button
            size="small"
            onClick={handleRoundsDec}
            className={clsx([classes.button])}
            disabled={props.disabled || current === min}
          >
            <ChevronLeftIcon />
          </Button>
          : <Button
            size="small"
            onClick={isRounds ? handleRoundsInc : handleIncrement}
            className={clsx([classes.button, classes.paddingBottomZero])}
            disabled={props.disabled || current === max}
          >
            <ArrowDropUpIcon style={{ fontSize: isRounds && isBuildYourOwn ? 32 : 24 }} />
          </Button>
      }
      <Button
        disabled
        classes={{
          disabled: clsx(classes.disabled, {
            [classes.largeText]: props.largeText,
            [classes.seconds]: props.hasSec,
            [classes.secondsText]: props.hasSec
          })
        }}>
        {current}
        {
          props.hasSec
            ?
            <>
              <br />
              sec
            </>
            : null
        }
      </Button>
      {
        props.isMobileMode
          ? <Button
            size="small"
            onClick={handleRoundsInc}
            className={clsx([classes.button])}
            disabled={props.disabled || current === max}
          >
            <ChevronRightIcon />
          </Button>
          : <Button
            size="small"
            onClick={isRounds ? handleRoundsDec : handleDecrement}
            className={clsx([classes.button, classes.paddingTopZero])}
            disabled={props.disabled || current === min}
          >
            <ArrowDropDownIcon style={{ fontSize: isRounds && isBuildYourOwn ? 32 : 24 }} />
          </Button>
      }
    </ButtonGroup>
  );
}

// hello
export default GroupedButtons;
