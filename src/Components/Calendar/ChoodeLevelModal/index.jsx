import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as actions from '../../../Store/Action';


import Card from './LevelCard'
import WeekSelect from './SelectDropDown'


const useSytles = makeStyles(theme => ({
  center: {
    justifyContent: 'center',
    paddingTop: '24px'
  },
  buttons: {
    letterSpacing: '0.65px'
  },
  padding: {
    padding: 8
  },
  title: {
    marginTop: 0,
    padding: 8,
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: '1.35',
    letterSpacing: '0.07em',
    textAlign: 'center'
  },
  rootOverRide: {
    padding: '24px 0',
    width: '90%',
    [theme.breakpoints.down(415)]: {
      margin: '18px',
    },
  }
}))

const PickLevel = (obj) => [
  {
    levelImg: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/onboard-level-intro.jpg',
    levelName: 'intro',
    levelTagAccess: 1235,
    levelId: 0,
    planId: 1,
    showWeekIndexes: true,
    selectedIndex: obj ? obj.weekIndex : 1,

  },
  {
    levelImg: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/onboard-level1.jpg',
    levelName: 'levelOne',
    levelTagAccess: 1215,
    levelId: 1,
    planId: 2,
    selectedIndex: 1
  },
  {
    levelImg: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/onboard-level2.jpg',
    levelName: 'levelTwo',
    levelTagAccess: 1219,
    levelId: 2,
    planId: 3,
    selectedIndex: 1
  },
  {
    levelImg: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/onboard-level3.jpg',
    levelName: 'levelThree',
    levelTagAccess: 1223,
    levelId: 3,
    planId:4,
    selectedIndex: 1
  },
  {
    levelImg: 'https://gymfit-images.s3.amazonaws.com/Welcome+Page+assets/onboard-level4.jpg',
    levelName: 'levelFour',
    levelTagAccess: 1227,
    levelId: 4,
    planId:5,
    selectedIndex: 1
  }
]

const ChooseLevelModal = (props) => {
  const [selecetedLevel, setSelectedLevel] = useState();
  const [newWeekIndex, setNewWeekIndex] = useState();
  const { level, userAccessLevels, weekIndex } = props.levelAccess ? props.levelAccess : {level: '' , userAccessLevels: [], weekIndex: '' }
  const classes = useSytles();

  const plansArray = PickLevel(props.levelAccess);

  useEffect(() => {
    setSelectedLevel(level);
    setNewWeekIndex(weekIndex);
    return () => {
      setSelectedLevel(level);
      setNewWeekIndex(weekIndex);
    }
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  const handleSubmit = () => {
    if (selecetedLevel === 0) {
      props.ChooseLevel({
        planId: plansArray[selecetedLevel].planId,
        weekIndex: newWeekIndex
      })
    }
    else {
      props.ChooseLevel({
        planId: plansArray[selecetedLevel].planId,
        weekIndex: plansArray[selecetedLevel].selectedIndex
      })
    }

    if (props.redirect) history.push("/dashboard");
    else props.handleClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth='lg'
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.rootOverRide
      }}
    >
      <Typography variant='h3' className={classes.title}>
        Pick Your Level
      </Typography>
      <DialogContent classes={{
        root: classes.padding
      }}>
        <Grid container justifyContent='center'>
        {
          plansArray.map((levelData, index) => {
            return (
              <Grid item xs={6} sm={5} md={2} lg={2} className={classes.padding} key={index}>
                <Card
                  selected={selecetedLevel === levelData.levelId}
                  imageURL={levelData.levelImg}
                  onClick={() => setSelectedLevel(levelData.levelId)}
                  hasAccess={userAccessLevels.includes(levelData.levelTagAccess)}
                />
                {
                  levelData.showWeekIndexes
                    ? <WeekSelect
                        selectedIndex={levelData.selectedIndex}
                        disabled={userAccessLevels.includes(levelData.levelTagAccess)}
                        value={newWeekIndex}
                        handleWeekIndex={e => setNewWeekIndex(e.target.value)}
                      />
                    : null
                }
              </Grid>
            )
          })
          }
          <Grid item xs={12} sm={12} md={12} lg={12} >
            <Typography variant='subtitle1' style={{color: 'red'}} align='center' > * Note: Selecting a different level will replace your current schedule. </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.center}>
        <Button
          className={classes.buttons}
          onClick={handleSubmit}
          variant='contained'
          color="primary"
          autoFocus
          disabled={userAccessLevels?.length <=0}
        >
          Add to Calendar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
// userAccessLevels
const mapStateToProps = state => {
  return {
    levelAccess: state.login.integratedPlans,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ChooseLevel: (data) => dispatch(actions.ChooseLevel(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLevelModal);
