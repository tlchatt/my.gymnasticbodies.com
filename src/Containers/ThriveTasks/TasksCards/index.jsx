import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { splitTaskDescription } from '../../../util/taskText';

const useStyles = makeStyles({
  root: {
    maxWidth: 330,
    width: '100%'
  },
  cardContent: {
    padding: '12px !important'
  },
  gridRoot: {
    padding: 12,
    display: 'flex',
    justifyContent: 'center'
  },
  taskTitle: {
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const { label, note } = splitTaskDescription(props.description);

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className={classes.gridRoot}>
        <Card elevation={4} className={classes.root}>
          {/* Some catalog tasks (Workout, feeling/sleep/soreness ratings) have no image. */}
          {props.image &&
            <CardMedia
              component="img"
              alt=""
              height='auto'
              width={330}
              image={`https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/nutrition/${props.image}`}
              title="Contemplative Reptile"
            />
          }
          <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.taskTitle}>
            <CheckIcon style={{ fontSize: 'inheret', marginRight: 4, color: props.isCompleted ?  'rgb(0, 200, 83)' : 'rgba(0, 0, 0, 0.87)' }} />
            {label}
          </Typography>
          {note && <Typography variant="body2" align="center" style={{ color: '#6C6C6C' }}>{note}</Typography>}
          </CardContent>
        </Card>
    </Grid>
  );
}
