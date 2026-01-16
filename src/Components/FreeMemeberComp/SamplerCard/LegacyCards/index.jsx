import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { useDispatch } from 'react-redux';
// import AutorenewIcon from '@material-ui/icons/Autorenew';

import CardContent from './LegacyCardContnet';
import EmptyLegacyCard from './EmpyLegacyCard';

import { GetAllWorkoutInfo } from '../../../../Store/Action/LevelsActions';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    // maxWidth: 200,
    padding: 4,
    minWidth: 175
  },
  cardTitle: {
    fontWeight: 600,
    color: '#FF9435',
    fontFamily: '"Open Sans", sans-serif',
    textTransform: 'uppercase'
  },
  avatar: {
    marginRight: 4
  },
  multiCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleContent: {
    display: 'flex',
  },
  rootHeader: {
    padding: 8
  },
  cardHeaderButton: {
    marginLeft: 12,
    background: "#FF9435",
    color: 'white',
    padding: '4px 18px',
    '&:hover': {
      backgroundColor: '#FF9435',
    },
  }
}));


// get last letter of a tring


export default function LegacyCards(props) {
  console.log("props in LegacyCards:", props)
  const classes = useStyles();
  const { workoutIndex, dateKey, dateKeyIndex, handleLegacyPlayer, isBuildYourOwn } = props;
  const dispatch = useDispatch();

  if (!props.chosenProgs.length) {
    return <EmptyLegacyCard {...props} />
  }

  const handleEditLegacy = () => {
    dispatch(GetAllWorkoutInfo(dateKey, workoutIndex, dateKeyIndex))
  }

  return (
    <Card className={classes.root} elevation={3} square >
      <CardHeader
        title={
          <>
            <Typography variant="h5" className={classes.cardTitle}>
              {props.category}
            </Typography>
            {!props.postAWS &&
              <Button className={classes.cardHeaderButton} onClick={handleEditLegacy}>
                Edit
              </Button>
            }

          </>
        }
        disableTypography={true}
        style={{
          width: '100%',
        }}
        classes={{
          avatar: classes.avatar,
          content: classes.titleContent,
          root: classes.rootHeader
        }}
      />
      <div style={{ display: 'flex' }}>
        {
          props.chosenProgs.map((prog, index) =>
            <CardContent
              {...prog}
              key={index}
              showDivider={index < props.chosenProgs.length - 1}
              workoutIndex={workoutIndex}
              progressionIndex={index}
              dateKey={dateKey}
              dateKeyIndex={dateKeyIndex}
              handleLegacyPlayer={handleLegacyPlayer}
              isBuildYourOwn={isBuildYourOwn}
            />
          )
        }
      </div>
    </Card>
  );
}
