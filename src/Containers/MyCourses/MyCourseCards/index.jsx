import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';

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

export default function MyCourseCards(props) {
  const classes = useStyles();

  return (
    <Grid className={`${classes.classFinderGrid} ${props.addClass}`} item sm={4} xs={6} md={4}>
      <Card className={classes.root} square>
        <CardActionArea onClick={props.previrewCourse}>
          <CardMedia
            image={`https://gymfit-images.s3.amazonaws.com/CourseIcons/${props.image}`}
            className={classes.media}
            alt=""
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
}
