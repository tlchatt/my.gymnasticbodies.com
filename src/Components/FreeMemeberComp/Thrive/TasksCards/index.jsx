import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { splitTaskDescription } from '../../../../util/taskText';

const useStyles = makeStyles({
  cardContent: {
    padding: '12px !important'
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '4px 8px',
  },
  image: {
    borderRadius: '50%',
    width: 75,
    height: 75,
    objectFit: 'cover',
    border: '2px solid #707070'
  },
  complete: {
    border: '3px solid #40ea40'
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const { label, note } = splitTaskDescription(props.description);

  return (
    <div className={classes.root}>
      {/* Some catalog tasks (Workout, feeling/sleep/soreness ratings) have no image. */}
      {props.image &&
        <img
          component="img"
          alt={label}
          src={`https://6z1gtynqfxcjjwix.public.blob.vercel-storage.com/nutrition/${props.image}`}
          className={clsx(classes.image, {[classes.complete]: props.isCompleted})}
        />
      }
      <Typography variant='overline' style={{color: '#6C6C6C'}}>
        {label}
        {note && <small style={{ display: 'block' }}>{note}</small>}
      </Typography>
    </div>
  );
}
