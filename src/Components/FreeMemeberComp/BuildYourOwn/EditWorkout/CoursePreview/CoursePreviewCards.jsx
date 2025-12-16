import React from 'react';
import { makeStyles, IconButton, Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import { addToEditRow } from '../../../../../Store/Action/WorkoutBuilderActions'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 240,
    width: '100%',
    height: '100%',
    margin: 'auto',
    position: 'relative',
    cursor: 'pointer',
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
}));

export default function CoursePreviewCards(props) {
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
    <Grid className={`${classes.classFinderGrid} ${props.addClass}`} item sm={4} xs={4} md={props.isMobileView ? 4 : 3}>
      <Card className={classes.root} square>
        <CardActionArea onClick={
          props.isLegacy || props.isMobileView
            ? props.relatedWorkouts
              ? props.showPreview
              : handleAddToRow
            : props.showPreview
        }>
          <CardMedia
            image={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.image}`}
            className={classes.media}
            alt=""
          />
        </CardActionArea>
        {
          props.noAddButton
            ? null
            : <IconButton
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleAddToRow}
            >
              <AddIcon />
            </IconButton>
        }
      </Card>
    </Grid>
  );
}
