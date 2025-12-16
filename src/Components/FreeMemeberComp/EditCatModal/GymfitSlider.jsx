import React from 'react';
import { Typography ,withStyles, makeStyles } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';


const GymfitSlider = withStyles({
  rail: {
    backgroundColor: '#656464'
  },
  track: {
    backgroundColor: '#656464'
  },
  mark: {
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    width: 16,
    height: 16,
    backgroundColor: '#656464'
  },
  markActive: {
    opacity: 1
  },
  thumb: {
    width: 16,
    height: 16,
    marginLeft: -8,
    marginTop: -7,
    color: '#91EEFF',
    border: '2px solid #656464'
  },
  valueLabel: {
    color: '#656464'
  },
})(Slider);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center'
  },
  levelText: {
    color: '#656464',
    fontFamily: 'Helvetica Neue',
    textTransform: 'uppercase',
    fontWeight: 500,
    lineHeight: 'normal'
  }
}))

const marks = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.levelText}>
        Level
      </Typography>
      <GymfitSlider
        defaultValue={
          props.currentLevel
            ? `${props.currentLevel}`.toLowerCase() === 'all'
              ? 5
              : parseInt(props.currentLevel)
            : 1
        }
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
        min={1}
        max={5}
        valueLabelFormat={(x) => x === 5 ? 'All' : x}
        onChange={props.onChangeCommitted}
        key={`slider-${props.currentLevel}`}
      />
    </div>
  );
}
