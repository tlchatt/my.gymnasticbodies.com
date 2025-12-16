import React from 'react';
import { makeStyles, Box, Divider, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import './mobile.scss'

import Content from './content'
import LegacyContent from './../../../SamplerCard/LegacyCards/LegacyCardContnet'
import CompleteButton from './completeButton'

import { GetAllWorkoutInfo } from '../../../../../Store/Action/LevelsActions.js';

const useStyles = makeStyles(theme => ({
  media: {
    aspectRatio: '3/2',
    maxWidth: 180,
    width: '100%',
    borderRadius: 4,
    paddingBottom: `${(2/3) * 100 }%`
  },
  cardTitle: {
    fontWeight: 600,
    color: '#FF9435',
    fontFamily: '"Open Sans", sans-serif',
    textTransform: 'uppercase',
    padding: 4,
    paddingTop: 12
  },
  overLay: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    fontSize: '3rem',
    opacity: 0.6,
    color: '#ffffff',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      opacity: 1,
      fontSize: '4rem',
    }
  },
  disabled: {
    color: 'green !important',
    backgroundColor: 'rgba(0,200,83,0.2) !important'
  },
  cardHeaderButton: {
    marginRight: 4,
    background: "#FF9435",
    color: 'white',
    padding: '4px 18px',
    '&:hover': {
      backgroundColor: '#FF9435',
    },
  },
  titleDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%'
  },
  subText: {
    color: '#5D5D5D',
    fontFamily: 'Helvetica Neue, "Open Sans", sans-serif',
    textTransform: 'uppercase'
  },
  emptyLegacyCard: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function MediaCardMobile(props) {
  const classes = useStyles();

  const CardConentType = props.isLegacy ? LegacyContent : Content;

  const workouts = props.isLegacy ? props.chosenProgs : props.workouts;
  const dispatch = useDispatch();

  const {
    dateKey,
    dateKeyIndex,
    handleLegacyPlayer,
    showDivider
  } = props;

  const handleEditLegacy = () => {
    dispatch(GetAllWorkoutInfo(dateKey, props.workoutIndex, props.dateKeyIndex))
  }

  return (
    <>
      <Box>
        <Box mt={props.isLegacy ? 0.5 : 0} className={clsx({[classes.titleDiv]: props.isLegacy})}>
          <Typography variant="h5" component="h2" align={props.isLegacy && workouts.length ? 'inherit' : 'center'} className={clsx(classes.cardTitle, {[classes.fullWidth]: props.isLegacy && !workouts.length })}>
            { props.isLegacy ? props.category : props.trainingType}
          </Typography>
          {
            props.isLegacy && <div style={{flex:1}}/>
          }
          {
            props.isLegacy && workouts.length ? <Button className={classes.cardHeaderButton}  onClick={handleEditLegacy}>
              Edit
            </Button> : null
          }
        </Box>
        {
          props.isLegacy
            ? <div className='gf-sub-container'>
              <div style={{ width: '100%' }}>
                {
                  workouts && workouts.length ?
                    workouts.map((workout, index) =>
                      <CardConentType
                        {...workout}
                        key={index}
                        showDivider={index < workouts.length - 1}
                        showNote
                        hideComplete
                        isMobileView
                        workoutIndex={props.workoutIndex}
                        dateKey={dateKey}
                        dateKeyIndex={dateKeyIndex}
                        handleLegacyPlayer={handleLegacyPlayer}
                      />)
                    : <div className={classes.emptyLegacyCard}>
                      <Button className={classes.cardHeaderButton} style={{ margin: '24px 0' }} onClick={() => dispatch(GetAllWorkoutInfo(dateKey, props.workoutIndex, props.dateKeyIndex))}>
                        Edit
                      </Button>
                      <Typography variant="h6" className={classes.subText} align='center'>
                        CLICK EDIT TO ADD EXERCISES
                      </Typography>
                    </div>
                }
              </div>
              {!props.isLegacy && <CompleteButton />}
            </div>
            : <Content
              openPlayerModal={() => props.openPlayerModal(props)}
              classId={props.classId}
              isPreviousDay={props.isPreviousDay}
              isLogged={props.isLogged}
              title={props.className}
              image={props.image}
              showRefresh={props.showRefresh}
              showNote={props.caption ? true : false}
              note={props.caption ? props.caption : null}
              dateKey={dateKey}
              dateKeyIndex={dateKeyIndex}
              trainingType={props.trainingType}
              scheduleId={props.scheduleId}
              isBuildYourOwn={props.isBuildYourOwn}
              classOrProgOrExId={props.classOrProgOrExId}
              showInLegacyModal={props.showInLegacyModal}
              isWorkoutAccessable={props.isWorkoutAccessable}
            />
        }
      </Box>
      {
        showDivider && <Divider variant='fullWidth' />
      }
    </>
  );
}
