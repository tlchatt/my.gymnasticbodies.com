import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import { addToEditRow } from '../../../../../Store/Action/WorkoutBuilderActions'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 240,
    width: '100%',
    margin: 'auto',
    cursor: 'pointer',
    marginBottom: 12
  },
  media: {
    paddingBottom: `${(2 / 3) * 100}%`,
  },
  button: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    background: '#1e88e5',
    padding: 8,
    color: 'white',
    '&:hover': {
      background: '#2196f3',
    }
  },
  classFinderGrid: {
    padding: 12,
    [theme.breakpoints.down(426)]: {
      padding: 4
    }
  },
  progName: {
    color: '#656464',
    fontWeight: 500,
    fontFamily: 'Helvetica Neue'
  }
}));

export default function IndividualCards(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddToRow = () => {
    dispatch(addToEditRow(
      {
        classOrExerciseName: props.classOrExerciseName,
        image: props.image,
        trainingType: props.catType,
        mediaId: props.mediaId,
        orderingType: props.orderingType,
        classIdOrExerciseId: props.classIdOrExerciseId
      },
      props.sectionIndex,
      props.sectionType,
      props.isLegacy
    ))
    props.handleOpenCollaps();
  }


  return (
    <Grid className={`${classes.classFinderGrid} ${props.addClass}`} item sm={4} xs={6} md={props.noAddButton ? 4 : 3}>
      <Card className={classes.root} square>
        <CardActionArea onClick={handleAddToRow}>
          <CardMedia
            image={`https://gymfit-images.s3.amazonaws.com/exercises/${props.image.split('.')[0].toUpperCase()}.jpg`}
            className={classes.media}
            alt=""
          />
        </CardActionArea>
      </Card>
      <Typography variant='body1' align='center' gutterBottom className={classes.progName}>
        {props.classOrExerciseName}
      </Typography>
    </Grid>
  );
}
