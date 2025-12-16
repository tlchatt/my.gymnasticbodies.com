import React from 'react';
import { makeStyles, Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useDispatch } from 'react-redux';
// import AutorenewIcon from '@material-ui/icons/Autorenew';

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
  subText: {
    color: '#5D5D5D',
    fontFamily: 'Helvetica Neue, "Open Sans", sans-serif',
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
    background: "linear-gradient(18deg, #FF9435 0%, #f05621 100%)",
    color: 'white',
    padding: '4px 18px',
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  }
}));


// get last letter of a tring


export default function EmpyLegacyCard(props) {
  const classes = useStyles();
  const { workoutIndex, dateKey, dateKeyIndex } = props;
  const dispatch = useDispatch();

  return (
    <Card className={classes.root} elevation={3}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" className={classes.cardTitle} align='center'>
          { props.category}
        </Typography>
        <Button className={classes.cardHeaderButton} onClick={() => dispatch(GetAllWorkoutInfo(dateKey, workoutIndex, dateKeyIndex))}>
          Edit
        </Button>
        <Typography variant="h6" className={classes.subText} align='center'>
          CLICK EDIT TO ADD EXERCISES
        </Typography>
      </CardContent>
    </Card>
  );
}
