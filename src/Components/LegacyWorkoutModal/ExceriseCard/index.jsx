import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import ButtonSection from './ButtonSection'
import ProgressionCard from './ProgressionCard'
import DropDown from './DropDown'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  divider: {
    marginTop: 8
  },
});

const ExceriseCard = props => {
  const classes = useStyles();
  const [dropDown, setDropDown] = useState({ isOpen: false, type: '' });
  const isStretchFollow = [287, 286, 288].includes(props.exerciseId);

  const hanldleDropDown = (name = '') => {
    if (name !== dropDown.type && dropDown.isOpen) {
      setDropDown({
        ...dropDown,
        type: name
      })
    }
    else {
      setDropDown({
        ...dropDown,
        isOpen: !dropDown.isOpen,
        type: name
      })
    }
  }
  const handleClose = () => setDropDown({ isOpen: false, type: '' });

  const { workoutInfo } = props;

  return (
    <Card className={classes.root} square={true}>
      <Grid container>
        {
          isStretchFollow
            ? <>
              <ProgressionCard
                exerciseNotation={props.exerciseNotation}
                name={workoutInfo.Strength.name}
                imageName={workoutInfo.Strength.imageName}
                setsAndReps={props.exerciseNotation === 'A0' ? null : workoutInfo.Strength.setsAndReps}
                stepNum={props.stepNo}
                handlePlayer={() => props.handlePlayer({
                  videoTitle: workoutInfo.Strength.name,
                  steps: workoutInfo.Strength.setsAndReps,
                  instructions: workoutInfo.Strength.instructions,
                  focusPoints: workoutInfo.Strength.focusPoints,
                  videoUrl: workoutInfo.Strength.videos[0].videoName,
                  technicalTips: workoutInfo.Strength.technicalTips
                })}
                type='Strength'
                isWarmup={true}
                hideSeeMore={true}
                handleEditOpen={props.handleEditOpen}
              />
              <Divider style={{ width: '100%' }} />
            </>
            : null
        }
        {
          workoutInfo.Strength && !isStretchFollow
            ? <>
              <ProgressionCard
                exerciseNotation={props.exerciseNotation}
                name={workoutInfo.Strength.name}
                imageName={workoutInfo.Strength.imageName}
                setsAndReps={props.exerciseNotation === 'A0' ? null : workoutInfo.Strength.setsAndReps}
                stepNum={props.stepNo}
                handlePlayer={() => props.handlePlayer({
                  videoTitle: workoutInfo.Strength.name,
                  steps: workoutInfo.Strength.setsAndReps,
                  instructions: workoutInfo.Strength.instructions,
                  focusPoints: workoutInfo.Strength.focusPoints,
                  videoUrl: workoutInfo.Strength.videos[0].videoName,
                  technicalTips: workoutInfo.Strength.technicalTips
                })}
                type='Strength'
                handleEditOpen={props.handleEditOpen}
              />
              <Divider style={{ width: '100%' }} />
            </>
            : null
        }
        {
          workoutInfo.Mobility
            ? <>
              <ProgressionCard
                exerciseNotation={props.exerciseNotation}
                name={workoutInfo.Mobility.name}
                imageName={workoutInfo.Mobility.imageName}
                setsAndReps={workoutInfo.Mobility.setsAndReps}
                stepNum={props.stepNo}
                handlePlayer={() => props.handlePlayer({
                  videoTitle: workoutInfo.Mobility.name,
                  steps: workoutInfo.Mobility.setsAndReps,
                  instructions: workoutInfo.Mobility.instructions,
                  focusPoints: workoutInfo.Mobility.focusPoints,
                  videoUrl: workoutInfo.Mobility.videos[0].videoName,
                  technicalTips: workoutInfo.Mobility.technicalTips
                })}
                type='Mobility'
              />
              <Divider style={{ width: '100%' }} />
            </>
            : null
        }
        {
          workoutInfo.WarmUp
            ? <>
              <ProgressionCard
                exerciseNotation={props.exerciseNotation}
                name={ workoutInfo.WarmUp.group === 'Rings' ? 'Rings Warmup' : workoutInfo.WarmUp.name}
                imageName={workoutInfo.WarmUp.imageName}
                setsAndReps={workoutInfo.WarmUp && workoutInfo.WarmUp.group !== 'Handstand' ? null : workoutInfo.WarmUp.setsAndReps}
                stepNum={props.stepNo}
                handlePlayer={() => props.handlePlayer({
                  videoTitle: workoutInfo.WarmUp.group === 'Rings' ? 'Rings Warmup' : workoutInfo.WarmUp.name,
                  steps: workoutInfo.WarmUp.setsAndReps,
                  instructions: workoutInfo.WarmUp.instructions,
                  focusPoints: workoutInfo.WarmUp.focusPoints,
                  videoUrl: workoutInfo.WarmUp.videos[0].videoName,
                  technicalTips: workoutInfo.WarmUp.technicalTips,
                  hideSecondTitle: workoutInfo.WarmUp && (workoutInfo.WarmUp.group === 'Rings' || workoutInfo.WarmUp.group === 'Movement' )
                })}
                isWarmup={true}
                type='Warmup'
              />
              <Divider style={{ width: '100%' }} />
            </>
            : null
        }
      </Grid>
      <Divider />
      <ButtonSection
        hanldleDropDown={hanldleDropDown}
        isStretchFollow={isStretchFollow}
        {...props}
      />
      <DropDown
        open={dropDown.isOpen}
        type={dropDown.type}
        hanldleDropDown={hanldleDropDown}
        handleClose={handleClose}
        data={{
          date: props.date,
          exerciseId: props.exerciseId,
          masterySteps: props.masterySteps,
          notes: props.notes,
          stepNo: props.stepNo,
          usersWorkoutSettingsId: props.usersWorkoutSettingsId,
          section: props.section,
          levelKey: props.levelKey
        }}
        workoutInfo={workoutInfo}
        isStretchFollow={isStretchFollow}
      />
      <Divider className={dropDown.isOpen ? classes.divider : null} />
    </Card>
  );
}

export default ExceriseCard;
