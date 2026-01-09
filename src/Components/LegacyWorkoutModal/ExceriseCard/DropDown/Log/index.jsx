import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useDispatch } from 'react-redux'

import { handleLegacyLog } from '../../../../../Store/Action/LegacyAction'
import { LogLegacy, LogLegacyNew } from '../../../../../Store/Action/LevelsActions'

const useStyles = makeStyles({
  title: {
    background: '#F5F5F5',
    padding: '8px 12px',
    width: '100%',
    lineHeight: 1
  },
  buttonsSection: {
    padding: '0 12px',
    margin: 'auto',
    marginRight: 0
  },
  cancleButton: {
    marginRight: 4
  },
  checkbox: {
    padding: '8px 12px',
    margin: 0,
    width: '100%'
  },
  select: {
    paddingTop: "8px",
    paddingBottom: "8px",
    minWidth: "32px"
  }
});

const Log = props => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [stepLog, setStepLog] = useState({});
  const [steps, setSteps] = useState([]);
  const [mobility, setMobility] = useState(true);
  const [stretchFollow, setStretchFollow] = useState(true);
  const [staySameStep, setStaySameStep] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let chosenSteps = props.data.masterySteps[props.data.stepNo];
    let reps = chosenSteps.repsOrSecs.match(/\d+/)[0];
    let initialSteps = [];
    let initialStepLog = {}

    for (let i = 0; i < chosenSteps.sets; i++) {
      initialSteps[i] = [...Array(parseInt(reps) + 1)].map((_, index) => { return { value: index, label: `${index}` } });
      initialSteps[i] = initialSteps[i].reverse();

      initialStepLog = {
        ...initialStepLog,
        [i + 1]: initialSteps[i][0]
      }
    }

    setSteps(initialSteps);
    setStepLog(initialStepLog);

  }, [props.data.stepNo, props.data.masterySteps])

  const handleDropStepDropDown = (set, event) => {
    setStepLog({
      ...stepLog,
      [set]: {
        value: parseInt(event.target.value),
        label: `${event.target.value}`,
      }
    })
  }


  const handleSave = () => {
    const setKeys = Object.keys(stepLog);
    let logArray = setKeys.map(key => {
      let repsCompleted = stepLog[key].value ? stepLog[key].value : 0;

      if (props.isStretchFollow && !stretchFollow) {
        repsCompleted = 0;
      }

      return { sets: parseInt(key), repsCompleted: repsCompleted }
    });

    let mobStatus = 1;

    if (!props.workoutInfo.Mobility && !props.workoutInfo.WarmUp) mobStatus = 0;
    if (props.workoutInfo.WarmUp) mobStatus = 1;

    if (props.workoutInfo.Mobility && !props.workoutInfo.WarmUp && mobility) mobStatus = 0;

    if (props.isStretchFollow) {
      mobStatus = 1;
    }
    console.log("props levels:",props)
    if (props.isLevels) {
      dispatch(
        LogLegacy(
          props.data.exerciseId,
          mobStatus,
          props.workoutInfo.WarmUp || props.isStretchFollow ? false : !staySameStep,
          props.data.masterySteps[props.data.stepNo],
          logArray,
          props.dateKeyIndex,
          props.dateKey,
          props.workoutIndex
        )
      )
      // dispatch(
      //   LogLegacyNew(
      //     props.data.exerciseId,
      //     mobStatus,
      //     props.workoutInfo.WarmUp || props.isStretchFollow ? false : !staySameStep,
      //     props.data.masterySteps[props.data.stepNo],
      //     logArray,
      //     props.dateKeyIndex,
      //     props.dateKey,
      //     props.workoutIndex
      //   )
      // )
    }
    else {
      dispatch(
        handleLegacyLog(
          props.data.date,
          props.data.exerciseId,
          mobStatus,
          props.workoutInfo.WarmUp || props.isStretchFollow ? false : !staySameStep,
          props.data.masterySteps[props.data.stepNo],
          logArray
        )
      )
    }
    props.handleClose();
  }

  const handleName = () => {
    let name = ''
    if (!props.workoutInfo.WarmUp) {
      name = 'Set';
    }

    if (props.workoutInfo.WarmUp && props.workoutInfo.WarmUp.group === "Handstand") {
      name = 'WRS';
    }

    if (props.workoutInfo.WarmUp && (props.workoutInfo.WarmUp.group === "Movement" || props.workoutInfo.WarmUp.group === "Rings" )) {
      name = 'WU';
    }
    return name;
  }


  return (
    <React.Fragment>
      {
        props.workoutInfo.Mobility
          ? <>
            <Typography variant="h6" className={classes.title}>Mobility</Typography>
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  name="Mobility"
                  color="primary"
                  checked={mobility}
                  onChange={() => setMobility(!mobility)}
                />
              }
              label={`I Completed All Mobility: ${props.workoutInfo.Mobility.setsAndReps}`}
            />
          </>
          : null
      }
      {
        props.workoutInfo.Strength && !props.isStretchFollow ? <Typography variant="h6" className={classes.title}>Strength (Reps Complete)</Typography> : null
      }
      {
        props.workoutInfo.WarmUp && !props.isStretchFollow ? <Typography variant="h6" className={classes.title}>Warmup</Typography> : null
      }
      {
        props.isStretchFollow ? <Typography variant="h6" className={classes.title}>Follow Along</Typography> : null
      }
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ padding: 12, paddingBottom: 0, display: "flex", flexWrap: 'wrap' }}>
          {
            steps.length && !props.isStretchFollow
              ? steps.map((step, index) => {
                return (
                  <div style={{ padding: 4 }} key={index}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-age-native-simple">{`${ props.workoutInfo.WarmUp ? handleName() : 'Set'} #${index + 1}`}</InputLabel>
                      <Select
                        native
                        classes={{ root: classes.select }}
                        label="Set #X"
                        value={stepLog[index + 1].value}
                        onChange={(event) => handleDropStepDropDown(index + 1, event)}
                        inputProps={{
                          name: `${ props.workoutInfo.WarmUp ? 'WU' : 'Set'} #${index + 1}`,
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        {step.map((val, index) => <option value={val.value} key={index}>{val.label}{ props.workoutInfo.WarmUp && props.workoutInfo.WarmUp.group === "Movement" ? '/ft' : null }</option>)}
                      </Select>
                    </FormControl>
                  </div>
                )
              })
              : null
          }
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          {
            props.workoutInfo.WarmUp || props.isStretchFollow
              ? null
              : <FormControlLabel
                className={classes.checkbox}
                control={
                  <Checkbox
                    name="SameStep"
                    color="primary"
                    checked={staySameStep}
                    onChange={() => setStaySameStep(!staySameStep)}
                  />
                }
                label={isMobile ? 'Stay At Step' : "I Want To Stay In The Same Step"}
              />
          }
          {
            props.isStretchFollow
              ? <FormControlLabel
                className={classes.checkbox}
                control={
                  <Checkbox
                    name="SameStep"
                    color="primary"
                    checked={stretchFollow}
                    onChange={() => setStretchFollow(!stretchFollow)}
                  />
                }
                label={isMobile ? "Completed Follow Along" : "I Completed The Follow Along"}
              />
              : null
          }
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} style={{ display: 'flex' }}>
          <div className={classes.buttonsSection}>
            <Button onClick={props.handleClose} className={classes.cancleButton}>Cancel</Button>
            { props.showNotesButton && <Button onClick={props.handleNotes} className={classes.cancleButton}>{props.hasNotes ? 'Edit Notes' :'Add Notes'}</Button> }
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Log;
